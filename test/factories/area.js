const Area = require("../../src/models").Area;

module.exports = factory => {
  const area = factory.define("area", Area, () => {
    return {
      name: factory.chance("first"),
      open: "true",
      description: factory.chance("sentence", { words: 5 }),
      gps: "122.123, 123.342",
      regionId: factory.assoc("region", "id")
    };
  });
  return area;
};
