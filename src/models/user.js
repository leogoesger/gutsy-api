"use strict";
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define("User", {
    role: {
      type: DataTypes.ENUM,
      values: ["CUSTOMER", "ADMIN", "SUPER_ADMIN", "AUTHOR", "BOLTER"],
      defaultValue: "CUSTOMER"
    },
    firstName: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    middleName: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: ""
    },
    lastName: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    address1: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: ""
    },
    address2: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: ""
    },
    city: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: ""
    },
    zip: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: ""
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
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
      foreignKey: "routeId",
      as: "routes"
    });
    User.belongsToMany(models.Book, {
      through: "UserBooks",
      foreignKey: "bookId",
      as: "books"
    });

    // User.hasMany(models.UserRoute, { foreignKey: "userId", as: "userRoutes" });
  };

  return User;
};
