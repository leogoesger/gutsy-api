"use strict";
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define("Book", {
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  });
  Book.associate = models => {
    Book.belongsToMany(models.Route, {
      through: "BookRoutes",
      foreignKey: "routeId",
      as: "routes"
    });
    Book.belongsToMany(models.Author, {
      through: "AuthorBooks",
      foreignKey: "authorId",
      as: "authors"
    });
    Book.belongsToMany(models.User, {
      through: "UserBooks",
      foreignKey: "userId",
      as: "users"
    });
  };
  return Book;
};
