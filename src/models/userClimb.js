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
  UserClimb.associate = models => {
    UserClimb.belongsTo(models.UserClimbStatus, {
      foreignKey: 'userClimbStatusId',
      as: 'status',
    });
  };
  return UserClimb;
};
