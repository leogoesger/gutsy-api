const chai = require('chai');
const assert = require('assert');
const app = require('../../src/app');
const chaiHttp = require('chai-http');
const factories = require('../factories');
const db = require('../../src/models');

chai.use(chaiHttp);

describe("'routes'service", () => {
  beforeEach(async () => {
    await db.sequelize.sync({force: true, logging: false});
  });

  it('should POST route', async () => {
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
      .post('/api/routes')
      .send(dummy);
    assert.equal(res.body.name, dummy.name);
    assert.equal(res.body.subareaId, dummy.subareaId);
  });

  it('should SHOW route', async () => {
    const route = await factories.create('route');
    const res = await chai.request(app).get('/api/routes/1');
    assert.equal(res.body.name, route.dataValues.name);
  });

  it('should UPDATE route', async () => {
    await factories.create('route');
    const dummy = {
      name: 'updated',
    };
    const res = await chai
      .request(app)
      .put('/api/routes/1')
      .send(dummy);
    assert.equal(res.body.name, dummy.name);
  });

  it('should DELETE route', async () => {
    await factories.create('route');
    const route = await factories.create('route');
    await chai.request(app).delete('/api/routes/1');
    const res = await chai.request(app).get('/api/routes/2');
    assert.equal(res.body.name, route.dataValues.name);
  });

  it('should NOT UPDATE route unknown', async () => {
    await factories.create('route');
    const dummy = {name: 'updated_name'};
    await chai
      .request(app)
      .put('/api/routes/2')
      .send(dummy)
      .catch(err => {
        assert.equal(err.response.status, 404);
      });
  });

  it('should NOT DELETE route unknown', async () => {
    await factories.create('route');
    const dummy = {name: 'updated_name'};
    await chai
      .request(app)
      .delete('/api/routes/2')
      .send(dummy)
      .catch(err => {
        assert.equal(err.response.status, 404);
      });
  });

  it('should return searched routes', async () => {
    const subarea = await factories.create('subarea');
    const dummy = {
      name: 'New route one',
      description: 'describe',
      grade: 'V5',
      category: 'trad',
      open: true,
      subareaId: subarea.dataValues.id,
    };
    const dummy2 = {
      name: 'New route two',
      description: 'describe',
      grade: 'V5',
      category: 'trad',
      open: true,
      subareaId: subarea.dataValues.id,
    };
    await chai
      .request(app)
      .post('/api/routes')
      .send(dummy);
    await chai
      .request(app)
      .post('/api/routes')
      .send(dummy2);

    const res = await chai
      .request(app)
      .post('/api/search-routes')
      .send({name: 'route'});
    assert.equal(res.body.length, 2);
  });

  it('should return 400 for searching non-exist routes', async () => {
    const subarea = await factories.create('subarea');
    const dummy = {
      name: 'New route one',
      description: 'describe',
      grade: 'V5',
      category: 'trad',
      open: true,
      subareaId: subarea.dataValues.id,
    };
    await chai
      .request(app)
      .post('/api/routes')
      .send(dummy);
    await chai
      .request(app)
      .post('/api/search-routes')
      .send({name: 'xxx'})
      .catch(err => {
        assert.equal(err.response.status, 404);
      });
  });
});
