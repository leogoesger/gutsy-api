import chai from "chai";
import assert from "assert";
import app from "../../src/app";
import chaiHttp from "chai-http";
import factories from "../factories";
import db from "../../src/models";

// import dotenv from "dotenv";
// dotenv.config({path: ".env.test"});
chai.use(chaiHttp);

describe("'regions'service", () => {
  beforeEach(async () => {
    await db.sequelize.sync({ force: true, logging: false });
  });

  it("should POST area", async () => {
    const region = await factories.create("region");
    const dummy = {
      name: "New area",
      open: true,
      description: "This is a cool area!",
      gps: "122.123, 123.4123",
      regionId: region.dataValues.id
    };
    const res = await chai
      .request(app)
      .post("/api/areas")
      .send(dummy);
    assert.equal(res.body.name, dummy.name);
  });
});
