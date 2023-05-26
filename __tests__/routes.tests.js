'use strict';

const { server } = require('../src/server');
const { db, users } = require('../src/models/index');
const supertest = require('supertest');


const request = supertest(server);
let dmTest; // trying to initialize the test created user for json token testing with bearer

beforeAll(async () => {
  await db.sync();
  dmTest = await users.create({
    username: 'dm',
    password: 'dm',
    role: 'dm',
  });
});

afterAll(async () => {
  await db.drop();
});

describe('testing character Routes', () => {
  // test.todo('Add test here!'); // helps clean up display on test runs to just reference todo tests
  test('Can create a new record', async () => {
    let response = await request.post('/character').send({
      name: 'Troy Adel',
      race: 'Elf',
      class: 'Rogue',
    }).set('Authorization', `Bearer ${dmTest.token}`);

    expect(response.status).toEqual(201);
    expect(response.body.name).toBe('Troy Adel');
  });

  test('Gets all records', async () => {                                
    let response = await request.get('/character').set('Authorization', `Bearer ${dmTest.token}`); // practicing testing with basic auth for testing

    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual('Troy Adel'); // have to target first index position for name
  });

  test('Get one records', async () => {
    let response = await request.get('/character/1').set('Authorization', `Bearer ${dmTest.token}`);

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Troy Adel');
  });

  test('Updates a single record', async () => {
    let response = await  request.put('/character/1').send({
      name: 'Troy Adelemar',
      race: 'Elf',
      class: 'Rogue',
    }).set('Authorization', `Bearer ${dmTest.token}`);

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Troy Adelemar');
  });

  test('Deletes a single record', async () => {
    let response = await request.delete('/character/1').set('Authorization', `Bearer ${dmTest.token}`);

    expect(response.status).toEqual(200);
  });

});