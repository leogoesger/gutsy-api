import factory, { SequelizeAdapter } from "factory-girl";
factory.setAdapter(new SequelizeAdapter());

const Region = require("../../src/models/region");

factory.define("region", Region, () => {
  return {
    name: factory.chance("first"),
    open: "true",
    description: factory.chance("sentence", { words: 5 })
  };
});
