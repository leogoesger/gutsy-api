'use strict';
module.exports = (sequelize, DataTypes) => {
  const Climb = sequelize.define('Climb', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    grade: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    open: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  });

  Climb.associate = models => {
    Climb.belongsTo(models.Subarea, {
      foreignKey: 'subareaId',
      as: 'subarea',
    });
    Climb.belongsToMany(models.Book, {
      through: models.BookClimb,
      foreignKey: 'climbId',
      as: 'books',
    });
    Climb.belongsToMany(models.User, {
      through: models.UserClimb,
      foreignKey: 'climbId',
      as: 'users',
    });
  };
  return Climb;
};
