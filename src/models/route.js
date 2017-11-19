'use strict';
module.exports = (sequelize, DataTypes) => {
  const Route = sequelize.define('Route', {
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
  });

  Route.associate = models => {
    Route.belongsTo(models.Area, {
      foreignKey: 'areaId',
    });
    Route.belongsToMany(models.Book, {
      through: 'BookRoutes',
      foreignKey: 'bookId',
      as: 'books',
    });
    Route.belongsToMany(models.User, {
      through: 'UserRoutes',
      foreignKey: 'userId',
      as: 'users',
    });
    // Route.hasMany(models.UserRoute, {
    //   foreignKey: "routeId",
    //   as: "userRoutes"
    // });
  };
  return Route;
};
