const chai = require('chai');
const assert = require('assert');
const app = require('../../src/app');
const chaiHttp = require('chai-http');
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
});
