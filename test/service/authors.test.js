const chai = require('chai');
const assert = require('assert');
const app = require('../../src/app');
const chaiHttp = require('chai-http');
const factories = require('../factories');
const db = require('../../src/models');

chai.use(chaiHttp);

describe("'authors'service", () => {
  beforeEach(async () => {
    await db.sequelize.sync({force: true, logging: false});
  });

  it('should POST author', async () => {
    const dummy = {
      firstName: 'first',
      lastName: 'last',
      email: 'author@test.com',
    };

    const res = await chai
      .request(app)
      .post('/api/authors')
      .send(dummy);
    assert.equal(res.body.title, dummy.title);
  });

  it('should LIST authors', async () => {
    await factories.create('author');
    await factories.create('author');
    const res = await chai.request(app).get('/api/authors');
    assert.equal(res.body.length, 2);
  });

  it('should SHOW author', async () => {
    const author = await factories.create('author');
    const res = await chai.request(app).get('/api/authors/1');
    assert.equal(res.body.title, author.dataValues.title);
  });

  it('should UPDATE author', async () => {
    await factories.create('author');
    const dummy = {
      firstName: 'updated',
    };
    const res = await chai
      .request(app)
      .put('/api/authors/1')
      .send(dummy);
    assert.equal(res.body.firstName, dummy.firstName);
  });

  it('should DELETE author', async () => {
    await factories.create('author');
    const author = await factories.create('author');
    await chai.request(app).delete('/api/authors/1');
    const res = await chai.request(app).get('/api/authors');
    assert.equal(res.body.length, 1);
    assert.equal(res.body[0].title, author.dataValues.title);
  });
});
