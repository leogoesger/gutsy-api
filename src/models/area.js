'use strict';

module.exports = (sequelize, DataTypes) => {
  const Area = sequelize.define('Area', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    open: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    gps: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    location: {
      type: DataTypes.JSONB,
      allownull: true,
    },
  });
  Area.associate = models => {
    Area.belongsTo(models.Region, {
      foreignKey: 'regionId',
      as: 'region',
    });
    Area.hasMany(models.Subarea, {
      foreignKey: 'areaId',
      as: 'subareas',
    });
  };
  return Area;
};
