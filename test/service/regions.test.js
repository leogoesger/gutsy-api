import chai from 'chai';
import assert from 'assert';
import app from '../../src/app';
import chaiHttp from 'chai-http';
import db from '../../src/models';
import factories from '../factories';

// import dotenv from "dotenv";
// dotenv.config({path: ".env.test"});
chai.use(chaiHttp);

describe("'regions'service", () => {
  beforeEach(async () => {
    await db.sequelize.sync({force: true, logging: false});
  });

  it('should POST region', async () => {
    const dummy = {
      name: 'New Region',
      open: true,
      description: 'This is a cool region!',
    };
    const res = await chai
      .request(app)
      .post('/api/regions')
      .send(dummy);
    assert.equal(res.body.name, dummy.name);
  });

  it('should LIST all regions', async () => {
    await factories.create('region');
    await factories.create('region');

    const res = await chai.request(app).get('/api/regions');
    assert.equal(res.body.length, 2);
  });

  it('should SHOW the region with its area', async () => {
    const dummy = await factories.create('area');

    const res = await chai.request(app).get('/api/regions/1');
    assert.equal(res.body.areas.length, 1);
    assert.equal(res.body.areas[0].name, dummy.dataValues.name);
  });

  it('should UPDATE the region', async () => {
    await factories.create('region');
    const dummy = {
      name: 'Edited Region',
    };
    const res = await chai
      .request(app)
      .put('/api/regions/1')
      .send(dummy);
    assert.equal(res.body.name, dummy.name);
  });

  it('should DELETE the region', async () => {
    await factories.create('region');
    const res1 = await chai.request(app).get('/api/regions');
    assert.equal(res1.body.length, 1);
    await chai.request(app).delete('/api/regions/1');
    const res2 = await chai.request(app).get('/api/regions');
    assert.equal(res2.body.length, 0);
  });
});
