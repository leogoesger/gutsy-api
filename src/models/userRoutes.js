"use strict";
module.exports = (sequelize, DataTypes) => {
  var UserRoutes = sequelize.define("UserRoutes", {
    userId: {
      type: DataTypes.INTEGER
    },
    routeId: {
      type: DataTypes.INTEGER
    }
  });
  UserRoutes.associate = models => {};
  return UserRoutes;
};
