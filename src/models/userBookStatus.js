'use strict';

module.exports = (sequelizeClient, DataTypes) => {
  const UserBookStatus = sequelizeClient.define('UserBookStatus', {
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
  UserBookStatus.associate = models => {
    UserBookStatus.hasMany(models.UserBook, {
      foreignKey: 'userBookStatusId',
      as: 'status',
    });
  };
  return UserBookStatus;
};
