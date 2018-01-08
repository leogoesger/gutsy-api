const chai = require('chai');
const assert = require('assert');
const app = require('../../src/app');
const chaiHttp = require('chai-http');
const factories = require('../factories');
const db = require('../../src/models');

chai.use(chaiHttp);

describe("'bookClimbs'service", () => {
  beforeEach(async () => {
    await db.sequelize.sync({force: true, logging: false});
  });

  it('should POST bookClimbs', async () => {
    const climb = await factories.create('climb');
    const book = await factories.create('book');
    const dummy = {
      climbId: climb.dataValues.id,
      bookId: book.dataValues.id,
    };
    const res = await chai
      .request(app)
      .post('/api/bookClimbs')
      .send(dummy);
    assert.equal(res.body.climbId, dummy.climbId);
    assert.equal(res.body.bookId, dummy.bookId);
  });

  it('should return 400', async () => {
    await chai
      .request(app)
      .post('/api/bookClimbs')
      .send({bookId: 1})
      .catch(err => {
        assert.equal(err.response.status, 400);
      });
  });

  it('should LIST climbs under book', async () => {
    await factories.create('bookClimb');
    const res = await chai.request(app).get('/api/climbs/1');
    assert.equal(res.body.books.length, 1);
    assert.notEqual(res.body.books[0].title, null);
  });
});
