'use strict';

module.exports = (sequelizeClient, DataTypes) => {
  const Subregion = sequelizeClient.define('Subregion', {
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
  });
  Subregion.associate = models => {
    Subregion.belongsTo(models.Region, {
      foreignKey: 'regionId',
      as: 'region',
    });
    Subregion.hasMany(models.Area, {
      foreignKey: 'subregionId',
      as: 'areas',
    });
  };
  return Subregion;
};
