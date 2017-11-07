"use strict";
module.exports = (sequelize, DataTypes) => {
  var Book = sequelize.define(
    "Book",
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
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
