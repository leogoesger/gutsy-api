'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserRoute = sequelize.define('UserRoute', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: DataTypes.INTEGER,
    routeId: DataTypes.INTEGER,
  });

  return UserRoute;
};
