'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserBook = sequelize.define('UserBook', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
  });
  UserBook.associate = models => {
    UserBook.belongsTo(models.UserBookStatus, {
      foreignKey: 'userBookStatusId',
      as: 'status',
    });
  };
  return UserBook;
};
