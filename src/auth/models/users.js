'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'secretstring';

const userModel = (sequelize, DataTypes) => {
  // Defining the Users model
  const model = sequelize.define('Users', {
    // Define the table columns and their data types
    username: { type: DataTypes.STRING, required: true, unique: true },
    password: { type: DataTypes.STRING, required: true },
    role: { type: DataTypes.ENUM('npc', 'spectator', 'player', 'dm'), required: true, defaultValue: 'npc'},
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        // Generate a JSON Web Token (JWT) for the user
        return jwt.sign({ username: this.username }, SECRET, { expiresIn: 1000 * 60 * 60 * 24 * 7 });
      },
      // set(tokenObj) {
      //   // Set the token value when assigned
      //   let token = jwt.sign(tokenObj, SECRET);
      //   return token;
      // },
    },
    capabilities: {
      type: DataTypes.VIRTUAL,
      get() {
        // Define the capabilities (permissions) based on the user's role
        const acl = {
          npc: ['read'],
          spectator: ['read', 'create'],
          player: ['read', 'create', 'update'],
          dm: ['read', 'create', 'update', 'delete'],
        };
        return acl[this.role];
      },
    },
  });

  // Middleware function executed before creating a new user
  model.beforeCreate(async (user) => {
    // Hash the user's password before storing it in the database
    let hashedPass = await bcrypt.hash(user.password, 10);
    user.password = hashedPass;
  });

  // Custom method to authenticate a user using basic authentication (username/password)
  model.authenticateBasic = async function (username, password) {
    // Find the user by username
    const user = await this.findOne({ where: { username } });

    // Compare the provided password with the hashed password stored in the database
    const valid = await bcrypt.compare(password, user.password);

    if (valid) {
      return user; // If the password is valid, return the user object
    }
    
    throw new Error('Unrecognized Adventurer: Your name is not inscribed in the tome of heroes. Only those chosen by destiny may proceed.');
    // If the password is invalid, throw an error indicating that the user is unrecognized
  };

  // Custom method to authenticate a user using a token
  model.authenticateToken = async function (token) {
    try {
      // Verify the provided token using the secret key
      const parsedToken = jwt.verify(token, SECRET);

      // Find the user based on the username extracted from the token
      const user = this.findOne({where: { username: parsedToken.username } });

      if (user) {
        return user; // If the user is found, return the user object
      }
      
      throw new Error('Lost in the Astral Plane: The user you seek has eluded even the most knowledgeable sages. It cannot be found.');
      // If the user is not found, throw an error indicating that the user cannot be found
    } catch (e) {
      throw new Error(e.message); // Throw any other errors that occur during token verification
    }
  };

  return model; // Return the defined model
};

module.exports = userModel; // Export the userModel function
