"use strict";
module.exports = (sequelize, DataTypes) => {
  var Area = sequelize.define("Area", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    open: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gps: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  Area.associate = models => {
    Area.belongsTo(models.Region, {
      foreignKey: "regionId"
    });
    Area.hasMany(models.Route, {
      foreignKey: "areaId",
      as: "routes"
    });
  };
  return Area;
};
