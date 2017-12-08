const Route = require('../../src/models').Route;

module.exports = factory => {
  const route = factory.define('route', Route, async () => {
    return {
      name: 'The Cave Route',
      open: true,
      description: 'Ice cave',
      grade: 'V10',
      category: 'Boulder',
      subareaId: factory.assoc('subarea', 'id'),
    };
  });
  return route;
};
