"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role: {
        type: Sequelize.ENUM,
        values: ["CUSTOMER", "ADMIN", "SUPER_ADMIN", "AUTHOR", "BOLTER"],
        defaultValue: "CUSTOMER"
      },
      firstName: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      middleName: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: ""
      },
      lastName: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      email: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      address1: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: ""
      },
      address2: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: ""
      },
      city: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: ""
      },
      zip: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: ""
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Users");
  }
};
