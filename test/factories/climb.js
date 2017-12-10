const Climb = require('../../src/models').Climb;

module.exports = factory => {
  const climb = factory.define('climb', Climb, async () => {
    return {
      name: 'The Cave Climb',
      open: true,
      description: 'Ice cave',
      grade: 'V10',
      category: 'Boulder',
      subareaId: factory.assoc('subarea', 'id'),
    };
  });
  return climb;
};
