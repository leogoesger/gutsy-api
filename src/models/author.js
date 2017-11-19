'use strict';

module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    firstName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  Author.associate = models => {
    Author.belongsToMany(models.Book, {
      through: 'AuthorBooks',
      foreignKey: 'bookId',
      as: 'books',
    });
  };
  return Author;
};
