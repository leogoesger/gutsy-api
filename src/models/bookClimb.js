'use strict';
module.exports = (sequelize, DataTypes) => {
  const BookClimb = sequelize.define('BookClimb', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    bookId: DataTypes.INTEGER,
    climbId: DataTypes.INTEGER,
  });

  return BookClimb;
};
