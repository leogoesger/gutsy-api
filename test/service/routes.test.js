const chai = require("chai");
const assert = require("assert");
const app = require("../../src/app");
const chaiHttp = require("chai-http");

// import dotenv from "dotenv";
// dotenv.config({path: ".env.test"});
chai.use(chaiHttp);

describe("'routes'service", () => {
  it("should POST route", async () => {
    const dummy = {
      title: "New route",
      open: true,
      description: "This is a cool route!"
    };
    const res = await chai
      .request(app)
      .post("/api/regions")
      .send(dummy);
    assert.equal(res.body.title, dummy.title);
  });
});
