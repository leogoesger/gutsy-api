const Subarea = require('../../src/models').Subarea;

module.exports = factory => {
  const subarea = factory.define('subarea', Subarea, () => {
    return {
      name: factory.chance('first'),
      open: true,
      description: factory.chance('sentence', {words: 5}),
      gps: '122.123, 123.342',
      areaId: factory.assoc('area', 'id'),
    };
  });
  return subarea;
};
