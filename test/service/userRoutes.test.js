const chai = require('chai');
const assert = require('assert');
const app = require('../../src/app');
const chaiHttp = require('chai-http');
const factories = require('../factories');
const db = require('../../src/models');
const getToken = require('../helpers/getToken');

chai.use(chaiHttp);

describe("'userRoutes'service", () => {
  beforeEach(async () => {
    await db.sequelize.sync({force: true, logging: false});
  });

  it('should POST userRoute', async () => {
    const user = await factories.create('user');
    const route = await factories.create('route');
    const dummy = {
      userId: user.dataValues.id,
      routeId: route.dataValues.id,
    };
    const res = await chai
      .request(app)
      .post('/api/userRoutes')
      .send(dummy);
    assert.equal(res.body.userId, dummy.userId);
  });

  it('should list Routes under user', async () => {
    await factories.create('userRoute');
    const res = await chai
      .request(app)
      .get('/users/me')
      .set('x-auth', getToken());
    assert.equal(res.body.routes.length, 1);
  });
});
