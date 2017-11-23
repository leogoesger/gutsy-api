const chai = require('chai');
const assert = require('assert');
const app = require('../../src/app');
const chaiHttp = require('chai-http');
const factories = require('../factories');
const db = require('../../src/models');

chai.use(chaiHttp);

describe("'authorBooks'service", () => {
  beforeEach(async () => {
    await db.sequelize.sync({force: true, logging: false});
  });

  it('should POST authorBooks', async () => {
    const author = await factories.create('author');
    const book = await factories.create('book');
    const dummy = {
      authorId: author.dataValues.id,
      bookId: book.dataValues.id,
    };
    const res = await chai
      .request(app)
      .post('/api/authorBooks')
      .send(dummy);
    assert.equal(res.body.authorId, dummy.authorId);
    assert.equal(res.body.bookId, dummy.bookId);
  });

  it('should return 400', async () => {
    await chai
      .request(app)
      .post('/api/authorBooks')
      .send({authorId: 1})
      .catch(err => {
        assert.equal(err.response.status, 400);
      });
  });

  it('should LIST Books under author', async () => {
    await factories.create('authorBook');
    const res = await chai.request(app).get('/api/authors/1');
    assert.equal(res.body.books.length, 1);
    assert.notEqual(res.body.books[0].title, null);
  });
});
