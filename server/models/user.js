"use strict";
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define("User", {
    email: DataTypes.STRING,
    password: DataTypes.STRING
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

  return User;
};
