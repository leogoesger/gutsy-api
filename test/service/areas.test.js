import chai from "chai";
import assert from "assert";
import app from "../../src/app";
import chaiHttp from "chai-http";
import factories from "../factories";
// import dotenv from "dotenv";
// dotenv.config({path: ".env.test"});
chai.use(chaiHttp);

describe("'regions'service", () => {
  it("should POST area", async () => {
    const dummy = {
      name: "New area",
      open: true,
      description: "This is a cool area!"
    };
    const res = await chai
      .request(app)
      .post("/api/areas")
      .send(dummy);
    assert.equal(res.body.name, dummy.name);
  });
});
