"use strict";
module.exports = (sequelize, DataTypes) => {
  const Region = sequelize.define("Region", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    open: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  Region.associate = models => {
    Region.hasMany(models.Area, {
      foreignKey: "regionId",
      as: "areas"
    });
  };
  return Region;
};
