const Subarea = require('../../src/models').Subarea;

module.exports = factory => {
  const subarea = factory.define('subarea', Subarea, async () => {
    const area = await factory.create('area');
    return {
      name: factory.chance('first'),
      open: true,
      description: factory.chance('sentence', {words: 5}),
      gps: '122.123, 123.342',
      areaId: area.dataValues.id,
      location: JSON.stringify({
        regionName: JSON.parse(area.dataValues.location).regionName,
        regionId: JSON.parse(area.dataValues.location).regionId,
        areaName: area.dataValues.name,
        areaId: area.dataValues.id,
      }),
    };
  });
  return subarea;
};
