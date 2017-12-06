const Route = require('../../src/models').Route;

module.exports = factory => {
  const route = factory.define('route', Route, async () => {
    const subarea = await factory.create('subarea');
    return {
      name: 'The Cave Route',
      open: true,
      description: 'Ice cave',
      grade: 'V10',
      category: 'Boulder',
      subareaId: subarea.dataValues.id,
      location: JSON.stringify({
        regionName: JSON.parse(subarea.dataValues.location).regionName,
        regionId: JSON.parse(subarea.dataValues.location).regionId,
        areaName: JSON.parse(subarea.dataValues.location).areaName,
        areaId: JSON.parse(subarea.dataValues.location).areaId,
        subareaName: subarea.dataValues.name,
        subareaId: subarea.dataValues.id,
      }),
    };
  });
  return route;
};
