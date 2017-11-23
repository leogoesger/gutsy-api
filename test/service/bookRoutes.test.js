const chai = require('chai');
const assert = require('assert');
const app = require('../../src/app');
const chaiHttp = require('chai-http');
const factories = require('../factories');
const db = require('../../src/models');

chai.use(chaiHttp);

describe("'bookRoutes'service", () => {
  beforeEach(async () => {
    await db.sequelize.sync({force: true, logging: false});
  });

  it('should POST bookRoutes', async () => {
    const route = await factories.create('route');
    const book = await factories.create('book');
    const dummy = {
      routeId: route.dataValues.id,
      bookId: book.dataValues.id,
    };
    const res = await chai
      .request(app)
      .post('/api/bookRoutes')
      .send(dummy);
    assert.equal(res.body.routeId, dummy.routeId);
    assert.equal(res.body.bookId, dummy.bookId);
  });

  it('should return 400', async () => {
    await chai
      .request(app)
      .post('/api/bookRoutes')
      .send({bookId: 1})
      .catch(err => {
        assert.equal(err.response.status, 400);
      });
  });

  it('should LIST routes under book', async () => {
    await factories.create('bookRoute');
    const res = await chai.request(app).get('/api/routes/1');
    const res_2 = await chai.request(app).get('/api/books/1');
    assert.equal(res.body.books.length, 1);
    assert.notEqual(res.body.books[0].title, null);
    assert.equal(res_2.body.routes.length, 1);
    assert.notEqual(res_2.body.routes[0].name, null);
  });
});
