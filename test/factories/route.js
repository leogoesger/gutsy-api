const Route = require('../../src/models').Route;

module.exports = factory => {
  const route = factory.define('route', Route, () => {
    return {
      name: 'The Cave Route',
      open: true,
      description: 'Ice cave',
      grade: 'V10',
      category: 'Boulder',
      areaId: factory.assoc('area', 'id'),
    };
  });
  return route;
};
