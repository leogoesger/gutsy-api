const chai = require('chai');
const assert = require('assert');
const app = require('../../src/app');
const chaiHttp = require('chai-http');
const db = require('../../src/models');

chai.use(chaiHttp);

describe("'users'service", () => {
  beforeEach(async () => {
    await db.sequelize.sync({force: true, logging: false});
  });

  it('should SIGNUP user', async () => {
    const dummy = {
      firstName: 'BAD',
      lastName: 'ASS',
      email: 'badass@ass.com',
      password: 'badass',
      address1: '123 badass st',
      city: 'ass',
      zip: '95123',
      isVerified: true,
    };
    const res = await chai
      .request(app)
      .post('/signup')
      .send(dummy);
    assert.equal(res.status, 200);
  });

  it('should LOGIN user', async () => {
    const dummy = {
      firstName: 'BAD',
      lastName: 'ASS',
      email: 'badass@ass.com',
      password: 'badass',
      address1: '123 badass st',
      city: 'ass',
      zip: '95123',
      isVerified: true,
    };
    await chai
      .request(app)
      .post('/signup')
      .send(dummy);
    const res = await chai
      .request(app)
      .post('/login')
      .send({email: 'badass@ass.com', password: 'badass'});
    assert.equal(res.status, 200);
  });

  it('should VALIDATE user', async () => {
    const dummy = {
      firstName: 'BAD',
      lastName: 'ASS',
      email: 'badass@ass.com',
      password: 'badass',
      address1: '123 badass st',
      city: 'ass',
      zip: '95123',
      isVerified: true,
    };
    const res = await chai
      .request(app)
      .post('/signup')
      .send(dummy);
    const res_2 = await chai
      .request(app)
      .get('/users/me')
      .set('gutsyJwt', res.body.gutsyJwt);
    assert.equal(res_2.body.firstName, dummy.firstName);
  });
});
