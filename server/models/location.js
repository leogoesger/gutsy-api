"use strict";
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define("Location", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    open: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Location.associate = models => {
    Location.hasMany(models.Route, {
      foreignKey: "routeId",
      as: "routes",
    });
  };
  return Location;
};
