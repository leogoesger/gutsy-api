const chai = require('chai');
const assert = require('assert');
const app = require('../../src/app');
const chaiHttp = require('chai-http');
const factories = require('../factories');
const db = require('../../src/models');

// import dotenv from "dotenv";
// dotenv.config({path: ".env.test"});
chai.use(chaiHttp);

describe("'areas'service", () => {
  beforeEach(async () => {
    await db.sequelize.sync({force: true, logging: false});
  });

  it('should POST area', async () => {
    const region = await factories.create('region');
    const dummy = {
      name: 'New area',
      open: true,
      description: 'This is a cool area!',
      gps: '122.123, 123.4123',
      regionId: region.dataValues.id,
    };
    const res = await chai
      .request(app)
      .post('/api/areas')
      .send(dummy);
    assert.equal(res.body.name, dummy.name);
  });
});
