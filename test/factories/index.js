import factory, { SequelizeAdapter } from "factory-girl";
factory.setAdapter(new SequelizeAdapter());

const regions = require("./area")(factory);
const routes = require("./region")(factory);

export default factory;
