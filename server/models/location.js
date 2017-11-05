"use strict";
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define("Location", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    open: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Location.associate = models => {
    Location.hasMany(models.Route, {
      foreignKey: "locationId",
      as: "routes"
    });
  };
  return Location;
};
