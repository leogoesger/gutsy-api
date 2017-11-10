import app from "../../src/app";
import factory, { SequelizeAdapter } from "factory-girl";
factory.setAdapter(new SequelizeAdapter());

const createModel = require("../../src/models/regions");
const regions = createModel(app);

factory.define("region", regions, () => {
  return {
    name: factory.chance("first"),
    open: "true",
    description: factory.chance("sentence", { words: 5 })
  };
});
