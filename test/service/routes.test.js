const chai = require("chai");
const assert = require("assert");
const app = require("../../src/app");
const chaiHttp = require("chai-http");

// import dotenv from "dotenv";
// dotenv.config({path: ".env.test"});
chai.use(chaiHttp);

describe("'regions'service", () => {
  it("should POST region", async () => {
    const dummy = {
      name: "New Region",
      open: true,
      description: "This is a cool region!"
    };
    const res = await chai
      .request(app)
      .post("/api/regions")
      .send(dummy);
    assert.equal(res.body.name, dummy.name);
  });
});
