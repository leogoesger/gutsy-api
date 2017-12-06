const Area = require('../../src/models').Area;

module.exports = factory => {
  const area = factory.define('area', Area, async () => {
    const region = await factory.create('region');
    return {
      name: factory.chance('first'),
      open: true,
      description: factory.chance('sentence', {words: 5}),
      gps: '122.123, 123.342',
      regionId: region.dataValues.id,
      location: JSON.stringify({
        regionName: region.dataValues.name,
        regionId: region.dataValues.id,
      }),
    };
  });
  return area;
};
