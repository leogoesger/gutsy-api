const chai = require('chai');
const assert = require('assert');
const app = require('../../src/app');
const chaiHttp = require('chai-http');
const factories = require('../factories');
const db = require('../../src/models');

chai.use(chaiHttp);

describe("'climbs'service", () => {
  beforeEach(async () => {
    await db.sequelize.sync({force: true, logging: false});
  });

  it('should POST climb', async () => {
    const subarea = await factories.create('subarea');
    const dummy = {
      name: 'abc',
      description: 'describe',
      grade: 'V5',
      category: 'trad',
      open: true,
      subareaId: subarea.dataValues.id,
    };

    const res = await chai
      .request(app)
      .post('/api/climbs')
      .send(dummy);
    assert.equal(res.body.name, dummy.name);
    assert.equal(res.body.subareaId, dummy.subareaId);
  });

  it('should SHOW climb', async () => {
    const climb = await factories.create('climb');
    const res = await chai.request(app).get('/api/climbs/1');
    assert.equal(res.body.name, climb.dataValues.name);
  });

  it('should UPDATE climb', async () => {
    await factories.create('climb');
    const dummy = {
      name: 'updated',
    };
    const res = await chai
      .request(app)
      .put('/api/climbs/1')
      .send(dummy);
    assert.equal(res.body.name, dummy.name);
  });

  it('should DELETE climb', async () => {
    await factories.create('climb');
    const climb = await factories.create('climb');
    await chai.request(app).delete('/api/climbs/1');
    const res = await chai.request(app).get('/api/climbs/2');
    assert.equal(res.body.name, climb.dataValues.name);
  });

  it('should NOT UPDATE climb unknown', async () => {
    await factories.create('climb');
    const dummy = {name: 'updated_name'};
    await chai
      .request(app)
      .put('/api/climbs/2')
      .send(dummy)
      .catch(err => {
        assert.equal(err.response.status, 404);
      });
  });

  it('should NOT DELETE climb unknown', async () => {
    await factories.create('climb');
    const dummy = {name: 'updated_name'};
    await chai
      .request(app)
      .delete('/api/climbs/2')
      .send(dummy)
      .catch(err => {
        assert.equal(err.response.status, 404);
      });
  });

  it('should return searched climbs', async () => {
    const subarea = await factories.create('subarea');
    const dummy = {
      name: 'New climb one',
      description: 'describe',
      grade: 'V5',
      category: 'trad',
      open: true,
      subareaId: subarea.dataValues.id,
    };
    const dummy2 = {
      name: 'New climb two',
      description: 'describe',
      grade: 'V5',
      category: 'trad',
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

    const res = await chai
      .request(app)
      .post('/api/search-climbs')
      .send({name: 'climb'});
    assert.equal(res.body.length, 2);
  });

  it('should return 400 for searching non-exist climbs', async () => {
    const subarea = await factories.create('subarea');
    const dummy = {
      name: 'New climb one',
      description: 'describe',
      grade: 'V5',
      category: 'trad',
      open: true,
      subareaId: subarea.dataValues.id,
    };
    await chai
      .request(app)
      .post('/api/climbs')
      .send(dummy);
    await chai
      .request(app)
      .post('/api/search-climbs')
      .send({name: 'xxx'})
      .catch(err => {
        assert.equal(err.response.status, 404);
      });
  });
});
