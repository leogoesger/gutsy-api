const Subregion = require('../../src/models').Subregion;

module.exports = factory => {
  const subregion = factory.define('subregion', Subregion, () => {
    return {
      name: factory.chance('first'),
      open: true,
      description: factory.chance('sentence', {words: 5}),
      gps: '122.123, 123.342',
      regionId: factory.assoc('region', 'id'),
    };
  });
  return subregion;
};
