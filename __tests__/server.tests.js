'use strict';

const { server } = require('../src/server');
const { db } = require('../src/models/index');
const supertest = require('supertest');
// const { test } = require('node:test');

const request = supertest(server);

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});


describe('Server testing', () => {

  test('Allow users to sign up', async () => {
    let response = await request.post('/signup').send({
      username: 'dm',
      password: 'password',
      role: 'dm',
    });

    expect(response.status).toBe(201);
    expect(response.body.user.username).toEqual('dm');
  });

  test('Allow users to signin', async () => {
    let response = await request.post('/signin').auth('dm', 'password');

    expect(response.status).toBe(200);
    expect(response.body.user.username).toEqual('dm');
  });



});