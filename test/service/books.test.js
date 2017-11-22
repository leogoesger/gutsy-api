const chai = require('chai');
const assert = require('assert');
const app = require('../../src/app');
const chaiHttp = require('chai-http');
const factories = require('../factories');
const db = require('../../src/models');

chai.use(chaiHttp);

describe("'books'service", () => {
  beforeEach(async () => {
    await db.sequelize.sync({force: true, logging: false});
  });

  it('should POST book', async () => {
    const dummy = {
      title: 'abc',
      description: 'pass',
      price: '34.55',
    };

    const res = await chai
      .request(app)
      .post('/api/books')
      .send(dummy);
    assert.equal(res.body.title, dummy.title);
  });

  it('should LIST books', async () => {
    await factories.create('book');
    await factories.create('book');
    const res = await chai.request(app).get('/api/books');
    assert.equal(res.body.length, 2);
  });

  it('should SHOW book', async () => {
    const book = await factories.create('book');
    const res = await chai.request(app).get('/api/books/1');
    assert.equal(res.body.title, book.dataValues.title);
  });

  it('should UPDATE book', async () => {
    await factories.create('book');
    const dummy = {
      title: 'updated',
    };
    const res = await chai
      .request(app)
      .put('/api/books/1')
      .send(dummy);
    assert.equal(res.body.title, dummy.title);
  });

  it('should DELETE book', async () => {
    await factories.create('book');
    const book = await factories.create('book');
    await chai.request(app).delete('/api/books/1');
    const res = await chai.request(app).get('/api/books');
    assert.equal(res.body.length, 1);
    assert.equal(res.body[0].title, book.dataValues.title);
  });
});
