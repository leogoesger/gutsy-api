import chai from 'chai';
import assert from 'assert';
import app from '../../src/app';
import chaiHttp from 'chai-http';
import db from '../../src/models';

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
});
