import app from "../../src/app";
import factory, { SequelizeAdapter } from "factory-girl";
factory.setAdapter(new SequelizeAdapter());

const createModel = require("../../src/models/area");
const areas = createModel(app);

factory.define("area", areas, () => {
  return {
    name: factory.chance("first"),
    open: "true",
    description: factory.chance("sentence", { words: 5 }),
    gps: "122.123, 123.342",
    regionId: factory.assoc("region", "id")
  };
});
