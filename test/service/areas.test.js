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
    const subregion = await factories.create('subregion');
    const dummy = {
      name: 'New area',
      open: true,
      description: 'This is a cool area!',
      gps: '122.123, 123.4123',
      subregionId: subregion.dataValues.id,
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
    assert.equal(res.body.subregionId, 1);
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
    const subregion = await factories.create('subregion');
    const dummy = {
      name: 'New area one',
      open: true,
      description: 'This is a cool area!',
      gps: '122.123, 123.4123',
      subregionId: subregion.dataValues.id,
    };
    const dummy2 = {
      name: 'New area two',
      open: true,
      description: 'This is a cool area!',
      gps: '122.123, 123.4123',
      subregionId: subregion.dataValues.id,
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
    const subregion = await factories.create('subregion');
    const dummy = {
      name: 'New area one',
      open: true,
      description: 'This is a cool area!',
      gps: '122.123, 123.4123',
      subregionId: subregion.dataValues.id,
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

  it('should return climbs under given area id', async () => {
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
      areaId: 1,
      min: 'V1',
      max: 'V16',
      category: 'Boulder',
    };

    const areaClimbs_3 = await chai
      .request(app)
      .post('/api/search-area-climbs')
      .send(dummy3);

    assert.equal(areaClimbs_3.body.length, 2);
    assert.equal(areaClimbs_3.body[0].name, dummy.name);

    const dummy4 = {
      areaId: 1,
      min: 'V6',
      max: 'V16',
      category: 'Boulder',
    };
    const areaClimbs_4 = await chai
      .request(app)
      .post('/api/search-area-climbs')
      .send(dummy4);

    assert.equal(areaClimbs_4.body[0].name, dummy2.name);
  });

  it('should return 400 for searching climbs without invalid params', async () => {
    const dummy = {
      areaId: 1,
      max: 'V16',
      category: 'Boulder',
    };
    await chai
      .request(app)
      .post('/api/search-area-climbs')
      .send(dummy)
      .catch(err => {
        assert.equal(err.response.status, 400);
      });
  });
});
