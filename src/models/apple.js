"use strict";
module.exports = (sequelize, DataTypes) => {
  const Apple = sequelize.define(
    "Apple",
    {
      quantity: DataTypes.TEXT
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        }
      }
    }
  );
  return Apple;
};
