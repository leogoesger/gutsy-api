const chai = require('chai');
const assert = require('assert');
const app = require('../../src/app');
const chaiHttp = require('chai-http');
const factories = require('../factories');
const db = require('../../src/models');

chai.use(chaiHttp);

describe("'subregions'service", () => {
  beforeEach(async () => {
    await db.sequelize.sync({force: true, logging: false});
  });

  it('should POST subregion', async () => {
    const region = await factories.create('region');
    const dummy = {
      name: 'New subregion',
      open: true,
      description: 'This is a cool subregion!',
      gps: '122.123, 123.4123',
      regionId: region.dataValues.id,
    };
    const res = await chai
      .request(app)
      .post('/api/subregions')
      .send(dummy);
    assert.equal(res.body.name, dummy.name);
  });

  it('should List subregions', async () => {
    await factories.create('subregion');
    await factories.create('subregion');
    const res = await chai.request(app).get('/api/subregions');
    assert.equal(res.body.length, 2);
  });

  it('should SHOW subregion', async () => {
    await factories.create('subregion');
    const res = await chai.request(app).get('/api/subregions/1');
    assert.equal(res.body.regionId, 1);
  });

  it('should UPDATE subregion', async () => {
    const subregion = await factories.create('subregion');
    const dummy = {name: 'updated_name'};
    const res = await chai
      .request(app)
      .put(`/api/subregions/${subregion.dataValues.id}`)
      .send(dummy);
    assert.equal(res.body.name, dummy.name);
  });

  it('should DELETE subregion', async () => {
    await factories.create('subregion');
    await factories.create('subregion');
    const res = await chai.request(app).get('/api/subregions');
    assert.equal(res.body.length, 2);
    await chai.request(app).delete('/api/subregions/1');
    const res2 = await chai.request(app).get('/api/subregions');
    assert.equal(res2.body.length, 1);
  });

  it('should NOT UPDATE subregion unknown', async () => {
    await factories.create('subregion');
    const dummy = {name: 'updated_name'};
    await chai
      .request(app)
      .put('/api/subregions/2')
      .send(dummy)
      .catch(err => {
        assert.equal(err.response.status, 404);
      });
  });

  it('should NOT DELETE subregion unknown', async () => {
    await factories.create('subregion');
    const dummy = {name: 'updated_name'};
    await chai
      .request(app)
      .delete('/api/subregions/2')
      .send(dummy)
      .catch(err => {
        assert.equal(err.response.status, 404);
      });
  });

  it('should return 400 subregion unknown', async () => {
    await chai
      .request(app)
      .delete('/api/subregions/a')
      .catch(err => {
        assert.equal(err.response.status, 400);
      });
  });

  it('should return searched subregions', async () => {
    const region = await factories.create('region');
    const dummy = {
      name: 'New subregion one',
      open: true,
      description: 'This is a cool subregion!',
      gps: '122.123, 123.4123',
      regionId: region.dataValues.id,
    };
    const dummy2 = {
      name: 'New subregion two',
      open: true,
      description: 'This is a cool subregion!',
      gps: '122.123, 123.4123',
      regionId: region.dataValues.id,
    };
    await chai
      .request(app)
      .post('/api/subregions')
      .send(dummy);
    await chai
      .request(app)
      .post('/api/subregions')
      .send(dummy2);
    const res = await chai
      .request(app)
      .post('/api/search-subregions')
      .send({name: 'subregion'});
    assert.equal(res.body.length, 2);
  });

  it('should return 400 for searching non-exist subregions', async () => {
    const region = await factories.create('region');
    const dummy = {
      name: 'New subregion one',
      open: true,
      description: 'This is a cool subregion!',
      gps: '122.123, 123.4123',
      regionId: region.dataValues.id,
    };
    await chai
      .request(app)
      .post('/api/subregions')
      .send(dummy);

    await chai
      .request(app)
      .post('/api/search-subregions')
      .send({name: 'xxx'})
      .catch(err => {
        assert.equal(err.response.status, 404);
      });
  });
});
