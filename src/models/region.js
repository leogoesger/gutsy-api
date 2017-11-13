"use strict";
const Sequelize = require("sequelize");

module.exports = (sequelizeClient, DataTypes) => {
  const Region = sequelizeClient.define("Region", {
    name: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    open: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
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
