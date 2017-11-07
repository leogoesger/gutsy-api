"use strict";
module.exports = (sequelize, DataTypes) => {
  const Route = sequelize.define("Route", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  Route.associate = models => {
    Route.belongsTo(models.Area, {
      foreignKey: "areaId"
    });
    Route.belongsToMany(models.User, {
      through: "user_routes"
    });
  };
  return Route;
};
