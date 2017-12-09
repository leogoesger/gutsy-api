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
    Book.belongsToMany(models.Climb, {
      through: models.BookClimb,
      foreignKey: 'bookId',
      as: 'climbs',
    });
    Book.belongsToMany(models.Author, {
      through: models.AuthorBook,
      foreignKey: 'bookId',
      as: 'authors',
    });
    Book.belongsToMany(models.User, {
      through: models.UserBook,
      foreignKey: 'bookId',
      as: 'users',
    });
  };
  return Book;
};
