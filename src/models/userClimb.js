'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserClimb = sequelize.define('UserClimb', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: DataTypes.INTEGER,
    climbId: DataTypes.INTEGER,
  });

  return UserClimb;
};
