'use strict';

module.exports = (sequelizeClient, DataTypes) => {
  const UserClimbStatus = sequelizeClient.define('UserClimbStatus', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    statusName: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
  });
  UserClimbStatus.associate = models => {
    UserClimbStatus.hasMany(models.UserClimb, {
      foreignKey: 'userClimbStatusId',
      as: 'status',
    });
  };
  return UserClimbStatus;
};
