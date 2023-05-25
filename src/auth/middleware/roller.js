'use strict';

function rollDice(dc) {
  // console.log('inside the rolldice function');
  const min = 1;
  const max = 20;
  const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  console.log(randomNumber);

  // let dcMin = 10;
  // let dcMax = 19;
  // const dcNumber = Math.floor(Math.random() * (dcMax - dcMin + 1) + min);

  if (randomNumber >= dc) {
    console.log('inside the if else');
    let message = `survived! With a roll of ${randomNumber}, you manage to evade the pressure plate, sidestepping the trap unscathed.`;
    return message;
  } else {
    let message = `failed! Despite your efforts, the trap triggers with a loud click as your roll of ${randomNumber} fails to detect the hidden pressure plate. You fall for an eternity in the chasm of doom...`;
    return message;
  }

}

module.exports = rollDice;