"use strict";
const { userBooks } = require("../seeder-data");

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert("UserBooks", userBooks);
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete("UserBooks");
  }
};
