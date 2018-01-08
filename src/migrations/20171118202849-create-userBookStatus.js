'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserBookStatuses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      statusName: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true,
      },
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('UserBookStatuses');
  },
};
