"use strict";
module.exports = (sequelize, DataTypes) => {
  var Author = sequelize.define(
    "Author",
    {
      firstName: DataTypes.TEXT,
      lastName: DataTypes.TEXT,
      email: DataTypes.TEXT
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        }
      }
    }
  );
  return Author;
};
