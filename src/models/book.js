"use strict";
module.exports = (sequelize, DataTypes) => {
  var Book = sequelize.define(
    "Book",
    {
      title: DataTypes.TEXT,
      description: DataTypes.TEXT,
      price: DataTypes.BOOLEAN
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        }
      }
    }
  );
  return Book;
};
