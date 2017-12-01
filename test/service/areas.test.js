const chai = require('chai');
const assert = require('assert');
const app = require('../../src/app');
const chaiHttp = require('chai-http');
const factories = require('../factories');
const db = require('../../src/models');

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

  it('should NOT UPDATE area unknown', async () => {
    await factories.create('area');
    const dummy = {name: 'updated_name'};
    await chai
      .request(app)
      .put('/api/areas/2')
      .send(dummy)
      .catch(err => {
        assert.equal(err.response.status, 404);
      });
  });

  it('should NOT DELETE area unknown', async () => {
    await factories.create('area');
    const dummy = {name: 'updated_name'};
    await chai
      .request(app)
      .delete('/api/areas/2')
      .send(dummy)
      .catch(err => {
        assert.equal(err.response.status, 404);
      });
  });

  it('should return 400 area unknown', async () => {
    await chai
      .request(app)
      .delete('/api/areas/a')
      .catch(err => {
        assert.equal(err.response.status, 400);
      });
  });

  it('should return searched areas', async () => {
    const region = await factories.create('region');
    const dummy = {
      name: 'New area one',
      open: true,
      description: 'This is a cool area!',
      gps: '122.123, 123.4123',
      regionId: region.dataValues.id,
    };
    const dummy2 = {
      name: 'New area two',
      open: true,
      description: 'This is a cool area!',
      gps: '122.123, 123.4123',
      regionId: region.dataValues.id,
    };
    await chai
      .request(app)
      .post('/api/areas')
      .send(dummy);
    await chai
      .request(app)
      .post('/api/areas')
      .send(dummy2);
    const res = await chai
      .request(app)
      .post('/api/search-areas')
      .send({name: 'area'});
    assert.equal(res.body.length, 2);
  });

  it('should return 400 for searching non-exist areas', async () => {
    const region = await factories.create('region');
    const dummy = {
      name: 'New area one',
      open: true,
      description: 'This is a cool area!',
      gps: '122.123, 123.4123',
      regionId: region.dataValues.id,
    };
    await chai
      .request(app)
      .post('/api/areas')
      .send(dummy);

    await chai
      .request(app)
      .post('/api/search-areas')
      .send({name: 'xxx'})
      .catch(err => {
        assert.equal(err.response.status, 404);
      });
  });
});
