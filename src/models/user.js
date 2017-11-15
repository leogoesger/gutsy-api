"use strict";
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define("User", {
    email: DataTypes.TEXT,
    password: DataTypes.TEXT
  });

  User.findByToken = function(token) {
    const User = this;
    let decoded;
    try {
      decoded = jwt.verify(token, "leogoesger");
    } catch (e) {
      return Promise.reject();
    }
    return User.find({ where: { email: decoded.email } });
  };

  User.associate = models => {
    User.belongsToMany(models.Route, {
      through: "UserRoutes",
      as: "routes"
    });
  };

  return User;
};
