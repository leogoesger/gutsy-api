"use strict";
module.exports = (sequelize, DataTypes) => {
  var UserRoutes = sequelize.define("UserRoutes", {});
  UserRoutes.associate = models => {};
  return UserRoutes;
};
