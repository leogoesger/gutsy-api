'use strict';
module.exports = (sequelize, DataTypes) => {
  const Route = sequelize.define('Route', {
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    grade: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    open: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    location: {
      type: DataTypes.JSONB,
      allownull: true,
    },
  });

  Route.associate = models => {
    Route.belongsTo(models.Subarea, {
      foreignKey: 'subareaId',
      as: 'subarea',
    });
    Route.belongsToMany(models.Book, {
      through: models.BookRoute,
      foreignKey: 'routeId',
      as: 'books',
    });
    Route.belongsToMany(models.User, {
      through: models.UserRoute,
      foreignKey: 'routeId',
      as: 'users',
    });
  };
  return Route;
};
