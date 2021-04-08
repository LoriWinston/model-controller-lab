const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { Router } = require("express");
const Bird = require('../lib/models/Bird');

describe('model-controller-lab routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  let bird;
  beforeEach ( async () => {
    bird = await Bird.insert({  name: 'eagle', age: 3, color: 'golden' });

  });

  it('adds a bird to the database', async () => {
    const res = await request(app)
      .post('/api/v1/birds')
      .send({ name: 'falcon', age: 5, color: 'brown' });

    expect(res.body).toEqual({ 
      id: expect.any(String),
      name: 'falcon', 
      age: 5, 
      color: 'brown', 
    });
  });

  it('gets a list of all birds', async () => {
    const res = await request(app)
    .get('/api/v1/birds');

    expect(res.body).toEqual([{
          "id": "1", 
      "name": "eagle",
      "age": 3,
      "color": "golden"

    }]);
  });


});
