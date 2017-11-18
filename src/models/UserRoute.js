"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserRoute = sequelize.define("UserRoute", {
    quantity: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    routeId: DataTypes.INTEGER
  });

  return UserRoute;
};
