"use strict";
module.exports = (sequelize, DataTypes) => {
  const BookRoute = sequelize.define("BookRoute", {
    bookId: DataTypes.INTEGER,
    routeId: DataTypes.INTEGER
  });

  return BookRoute;
};
