/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  id: "006a1891-d70e-4b2a-9d8a-bdeb91b53c3d",
  name: 'Pug',
  height: "12-25",
  weight: "12 - 25"
};

describe('Dog routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
  });
});

describe('GET /dogs/:id', function () {
  it('responds with 200 if there exists a dogs with a given id', function(){
    return agent.get('/dogs/150')
      .expect(200);
  });
  it('finds recipes from the API', function() {
    return agent.get('/dogs/122')
      .expect(200);
  });
 

});