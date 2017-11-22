'use strict';

module.exports = (sequelize, DataTypes) => {
  const AuthorBook = sequelize.define('AuthorBook', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    authorId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
  });
  return AuthorBook;
};
