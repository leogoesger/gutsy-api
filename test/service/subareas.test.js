const chai = require('chai');
const assert = require('assert');
const app = require('../../src/app');
const chaiHttp = require('chai-http');
const factories = require('../factories');
const db = require('../../src/models');

chai.use(chaiHttp);

describe("'subareas'service", () => {
  beforeEach(async () => {
    await db.sequelize.sync({force: true, logging: false});
  });

  it('should POST subarea', async () => {
    const area = await factories.create('area');
    const dummy = {
      name: 'New subarea',
      open: true,
      description: 'This is a cool subarea!',
      gps: '122.123, 123.4123',
      areaId: area.dataValues.id,
    };
    const res = await chai
      .request(app)
      .post('/api/subareas')
      .send(dummy);
    assert.equal(res.body.name, dummy.name);
  });

  it('should List subareas', async () => {
    await factories.create('subarea');
    await factories.create('subarea');
    const res = await chai.request(app).get('/api/subareas');
    assert.equal(res.body.length, 2);
  });

  it('should SHOW subarea', async () => {
    await factories.create('subarea');
    const res = await chai.request(app).get('/api/subareas/1');
    assert.equal(res.body.areaId, 1);
  });

  it('should UPDATE subarea', async () => {
    const subarea = await factories.create('subarea');
    const dummy = {name: 'updated_name'};
    const res = await chai
      .request(app)
      .put(`/api/subareas/${subarea.dataValues.id}`)
      .send(dummy);
    assert.equal(res.body.name, dummy.name);
  });

  it('should DELETE subarea', async () => {
    await factories.create('subarea');
    await factories.create('subarea');
    const res = await chai.request(app).get('/api/subareas');
    assert.equal(res.body.length, 2);
    await chai.request(app).delete('/api/subareas/1');
    const res2 = await chai.request(app).get('/api/subareas');
    assert.equal(res2.body.length, 1);
  });

  it('should NOT UPDATE subarea unknown', async () => {
    await factories.create('subarea');
    const dummy = {name: 'updated_name'};
    await chai
      .request(app)
      .put('/api/subareas/2')
      .send(dummy)
      .catch(err => {
        assert.equal(err.response.status, 404);
      });
  });

  it('should NOT DELETE subarea unknown', async () => {
    await factories.create('subarea');
    const dummy = {name: 'updated_name'};
    await chai
      .request(app)
      .delete('/api/subareas/2')
      .send(dummy)
      .catch(err => {
        assert.equal(err.response.status, 404);
      });
  });

  it('should return 400 subarea unknown', async () => {
    await chai
      .request(app)
      .delete('/api/subareas/a')
      .catch(err => {
        assert.equal(err.response.status, 400);
      });
  });

  it('should return searched subareas', async () => {
    const area = await factories.create('area');
    const dummy = {
      name: 'New subarea one',
      open: true,
      description: 'This is a cool subarea!',
      gps: '122.123, 123.4123',
      areaId: area.dataValues.id,
    };
    const dummy2 = {
      name: 'New subarea two',
      open: true,
      description: 'This is a cool subarea!',
      gps: '122.123, 123.4123',
      areaId: area.dataValues.id,
    };
    await chai
      .request(app)
      .post('/api/subareas')
      .send(dummy);
    await chai
      .request(app)
      .post('/api/subareas')
      .send(dummy2);
    const res = await chai
      .request(app)
      .post('/api/search-subareas')
      .send({name: 'subarea'});
    assert.equal(res.body.length, 2);
  });

  it('should return 400 for searching non-exist subareas', async () => {
    const area = await factories.create('area');
    const dummy = {
      name: 'New subarea one',
      open: true,
      description: 'This is a cool subarea!',
      gps: '122.123, 123.4123',
      areaId: area.dataValues.id,
    };
    await chai
      .request(app)
      .post('/api/subareas')
      .send(dummy);

    await chai
      .request(app)
      .post('/api/search-subareas')
      .send({name: 'xxx'})
      .catch(err => {
        assert.equal(err.response.status, 404);
      });
  });
});
