const chai = require('chai');
const assert = require('assert');
const app = require('../../src/app');
const chaiHttp = require('chai-http');
const factories = require('../factories');
const db = require('../../src/models');
const getToken = require('../helpers/getToken');

chai.use(chaiHttp);

describe("'userClimbs'service", () => {
  beforeEach(async () => {
    await db.sequelize.sync({force: true, logging: false});
  });

  it('should POST userClimb', async () => {
    const user = await factories.create('user');
    const climb = await factories.create('climb');
    const userClimbStatus = await factories.create('userClimbStatus');
    const dummy = {
      userId: user.dataValues.id,
      climbId: climb.dataValues.id,
      userClimbStatusId: userClimbStatus.dataValues.id,
    };
    const res = await chai
      .request(app)
      .post('/api/userClimbs')
      .send(dummy);
    assert.equal(res.body.userId, dummy.userId);
  });

  it('should return 400', async () => {
    await chai
      .request(app)
      .post('/api/userClimbs')
      .send({userId: 1})
      .catch(err => {
        assert.equal(err.response.status, 400);
      });
  });

  it('should LIST Climbs under user', async () => {
    await factories.create('userClimb');
    await factories.create('climb');
    await factories.create('climb');
    await chai
      .request(app)
      .post('/api/userClimbs')
      .send({userId: 1, climbId: 2});
    await chai
      .request(app)
      .post('/api/userClimbs')
      .send({userId: 1, climbId: 3});
    const res = await chai
      .request(app)
      .get('/users/me')
      .set('gutsyJwt', getToken());
    assert.equal(res.body.climbs.length, 3);
  });
});
