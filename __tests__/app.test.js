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

  it('gets a bird by id', async () => {
    const res = await request(app)
    .get('/api/v1/birds/1');

    expect(res.body).toEqual({
      "id": "1", 
      "name": "eagle",
      "age": 3,
      "color": "golden"
    });
  });

  it('updates bird info in database', async () => {
    
    
    const res = await request(app)
    .put('/api/v1/birds/1')
    .send({ 
      "id": "1", 
      "name": "chicken",
      "age": 3,
      "color": "golden"
    });

    expect(res.body).toEqual({
      "id": "1", 
      "name": "chicken",
      "age": 3,
      "color": "golden"
    });
  });

  it('deletes a bird by id', async () => {
    const res = await request(app)
    .delete('/api/v1/birds/1')

    expect(res.body).toEqual({
      "id": "1", 
      "name": "eagle",
      "age": 3,
      "color": "golden"
    });
  });


});
