"use strict";
module.exports = (sequelize, DataTypes) => {
  const Route = sequelize.define("Route", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Route.associate = models => {
    Route.belongsTo(models.Region, {
      foreignKey: "regionId"
    });
  };
  return Route;
};
