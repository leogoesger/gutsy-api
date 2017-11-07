"use strict";
module.exports = (sequelize, DataTypes) => {
  var UserRoute = sequelize.define("UserRoute", {});
  UserRoute.associate = models => {};
  return UserRoute;
};
