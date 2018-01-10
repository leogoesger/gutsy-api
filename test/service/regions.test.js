const chai = require('chai');
const assert = require('assert');
const app = require('../../src/app');
const chaiHttp = require('chai-http');
const factories = require('../factories');
const db = require('../../src/models');

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
    const dummy = await factories.create('subregion');

    const res = await chai.request(app).get('/api/regions/1');
    assert.equal(res.body.subregions.length, 1);
    assert.equal(res.body.subregions[0].name, dummy.dataValues.name);
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

  it('should NOT UPDATE region unknown', async () => {
    await factories.create('region');
    const dummy = {name: 'updated_name'};
    await chai
      .request(app)
      .put('/api/regions/2')
      .send(dummy)
      .catch(err => {
        assert.equal(err.response.status, 404);
      });
  });

  it('should NOT DELETE region unknown', async () => {
    await factories.create('region');
    const dummy = {name: 'updated_name'};
    await chai
      .request(app)
      .delete('/api/regions/2')
      .send(dummy)
      .catch(err => {
        assert.equal(err.response.status, 404);
      });
  });

  it('should return searched regions', async () => {
    const dummy = {
      name: 'New Region one',
      open: true,
      description: 'This is a cool region!',
    };
    const dummy2 = {
      name: 'New Region two',
      open: true,
      description: 'This is a cool region!',
    };
    await chai
      .request(app)
      .post('/api/regions')
      .send(dummy);
    await chai
      .request(app)
      .post('/api/regions')
      .send(dummy2);

    const res = await chai
      .request(app)
      .post('/api/search-regions')
      .send({name: 'region'});
    assert.equal(res.body.length, 2);
  });

  it('should return 400 for searching non-exist regions', async () => {
    const dummy = {
      name: 'New Region one',
      open: true,
      description: 'This is a cool region!',
    };
    await chai
      .request(app)
      .post('/api/regions')
      .send(dummy);
    await chai
      .request(app)
      .post('/api/search-regions')
      .send({name: 'xxx'})
      .catch(err => {
        assert.equal(err.response.status, 404);
      });
  });

  it('should return climbs under given region id', async () => {
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
      regionId: 1,
      min: 'V1',
      max: 'V16',
      category: 'Boulder',
    };

    const regionClimbs_3 = await chai
      .request(app)
      .post('/api/search-region-climbs')
      .send(dummy3);

    assert.equal(regionClimbs_3.body.length, 2);
    assert.equal(regionClimbs_3.body[0].name, dummy.name);

    const dummy4 = {
      regionId: 1,
      min: 'V6',
      max: 'V16',
      category: 'Boulder',
    };
    const regionClimbs_4 = await chai
      .request(app)
      .post('/api/search-region-climbs')
      .send(dummy4);

    assert.equal(regionClimbs_4.body[0].name, dummy2.name);
  });

  it('should return 400 for searching climbs without invalid params', async () => {
    const dummy = {
      regionId: 1,
      max: 'V16',
      category: 'Boulder',
    };
    await chai
      .request(app)
      .post('/api/search-region-climbs')
      .send(dummy)
      .catch(err => {
        assert.equal(err.response.status, 400);
      });
  });
});
