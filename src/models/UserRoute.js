'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserRoute = sequelize.define('UserRoute', {
    userId: DataTypes.INTEGER,
    routeId: DataTypes.INTEGER,
  });

  return UserRoute;
};
