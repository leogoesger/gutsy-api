'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserBook = sequelize.define('UserBook', {
    status: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
  });

  return UserBook;
};
