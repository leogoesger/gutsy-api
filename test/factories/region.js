const Region = require("../../src/models").Region;

module.exports = factory => {
  const region = factory.define("region", Region, () => {
    return {
      name: factory.chance("first"),
      open: true,
      description: factory.chance("sentence", { words: 5 })
    };
  });
  return region;
};
