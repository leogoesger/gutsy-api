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
    GPS: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  Area.associate = models => {
    Area.belongsTo(models.Region);
  };
  return Area;
};
