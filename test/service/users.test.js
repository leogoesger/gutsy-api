const chai = require("chai");
const assert = require("assert");
const app = require("../../src/app");
const chaiHttp = require("chai-http");

// import dotenv from "dotenv";
// dotenv.config({path: ".env.test"});
chai.use(chaiHttp);

describe("'users'service", () => {
  it("register user", async () => {
    const dummy = {
      password: "Pa$$word",
      email: Date.now() + "@gmail.com"
    };
    const res = await chai
      .request("http://localhost:8000")
      .post("/signup")
      .send(dummie);
    assert.notEqual(res.body.email, null);
    assert.equal(res.body.email, dummy.email);
  });
});
