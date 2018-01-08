const chai = require('chai');
const assert = require('assert');
const app = require('../../src/app');
const chaiHttp = require('chai-http');
const factories = require('../factories');
const db = require('../../src/models');
const getToken = require('../helpers/getToken');

chai.use(chaiHttp);

describe("'userBooks'service", () => {
  beforeEach(async () => {
    await db.sequelize.sync({force: true, logging: false});
  });

  it('should POST userBook', async () => {
    const user = await factories.create('user');
    const book = await factories.create('book');
    const userBookStatus = await factories.create('userBookStatus');
    const dummy = {
      userId: user.dataValues.id,
      bookId: book.dataValues.id,
      userBookStatusId: userBookStatus.dataValues.id,
    };
    const res = await chai
      .request(app)
      .post('/api/userBooks')
      .send(dummy);
    assert.equal(res.body.userId, dummy.userId);
    assert.equal(res.body.bookId, dummy.bookId);
  });

  it('should return 400', async () => {
    await chai
      .request(app)
      .post('/api/userBooks')
      .send({userId: 1})
      .catch(err => {
        assert.equal(err.response.status, 400);
      });
  });

  it('should LIST Books under user', async () => {
    await factories.create('userBook');
    const res = await chai
      .request(app)
      .get('/users/me')
      .set('gutsyJwt', getToken());
    assert.equal(res.body.books.length, 1);
  });
});
