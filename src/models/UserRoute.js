"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserRoute = sequelize.define("UserRoute", {
    quantity: DataTypes.TEXT
  });
  return UserRoute;
};
