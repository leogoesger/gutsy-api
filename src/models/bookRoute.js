'use strict';
module.exports = (sequelize, DataTypes) => {
  const BookRoute = sequelize.define('BookRoute', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    bookId: DataTypes.INTEGER,
    routeId: DataTypes.INTEGER,
  });

  return BookRoute;
};
