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

  it('should return climbs under given subregion id', async () => {
    const subarea = await factories.create('subarea');
    const dummy = {
      name: 'New climb one',
      description: 'describe',
      grade: 'V5',
      category: 'Boulder',
      open: true,
      subareaId: subarea.dataValues.id,
    };
    const dummy2 = {
      name: 'New climb two',
      description: 'describe',
      grade: 'V11',
      category: 'Boulder',
      open: true,
      subareaId: subarea.dataValues.id,
    };
    await chai
      .request(app)
      .post('/api/climbs')
      .send(dummy);
    await chai
      .request(app)
      .post('/api/climbs')
      .send(dummy2);

    const dummy3 = {
      subregionId: 1,
      min: 'V1',
      max: 'V16',
      category: 'Boulder',
    };

    const subregionClimbs_3 = await chai
      .request(app)
      .post('/api/search-subregion-climbs')
      .send(dummy3);

    assert.equal(subregionClimbs_3.body.length, 2);
    assert.equal(subregionClimbs_3.body[0].name, dummy.name);

    const dummy4 = {
      subregionId: 1,
      min: 'V6',
      max: 'V16',
      category: 'Boulder',
    };
    const subregionClimbs_4 = await chai
      .request(app)
      .post('/api/search-subregion-climbs')
      .send(dummy4);

    assert.equal(subregionClimbs_4.body[0].name, dummy2.name);
  });

  it('should return 400 for searching climbs without invalid params', async () => {
    const dummy = {
      subregionId: 1,
      max: 'V16',
      category: 'Boulder',
    };
    await chai
      .request(app)
      .post('/api/search-subregion-climbs')
      .send(dummy)
      .catch(err => {
        assert.equal(err.response.status, 400);
      });
  });
});
