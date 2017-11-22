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

  it('should List areas', async () => {
    await factories.create('area');
    await factories.create('area');
    const res = await chai.request(app).get('/api/areas');
    assert.equal(res.body.length, 2);
  });

  it('should SHOW area', async () => {
    await factories.create('area');
    const res = await chai.request(app).get('/api/areas/1');
    assert.equal(res.body.regionId, 1);
  });

  it('should UPDATE area', async () => {
    const area = await factories.create('area');
    const dummy = {name: 'updated_name'};
    const res = await chai
      .request(app)
      .put(`/api/areas/${area.dataValues.id}`)
      .send(dummy);
    assert.equal(res.body.name, dummy.name);
  });

  it('should DELETE area', async () => {
    await factories.create('area');
    await factories.create('area');
    const res = await chai.request(app).get('/api/areas');
    assert.equal(res.body.length, 2);
    await chai.request(app).delete('/api/areas/1');
    const res2 = await chai.request(app).get('/api/areas');
    assert.equal(res2.body.length, 1);
  });
});
