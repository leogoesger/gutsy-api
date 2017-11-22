'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), // eslint-disable-line
      allowNull: false,
    },
  });
  Book.associate = models => {
    Book.belongsToMany(models.Route, {
      through: models.BookRoute,
      foreignKey: 'routeId',
      as: 'routes',
    });
    Book.belongsToMany(models.Author, {
      through: models.AuthorBook,
      foreignKey: 'authorId',
      as: 'authors',
    });
    Book.belongsToMany(models.User, {
      through: models.UserBook,
      foreignKey: 'userId',
      as: 'users',
    });
  };
  return Book;
};
