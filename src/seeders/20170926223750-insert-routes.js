"use strict";
const { routes } = require("../seeder-data");

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert("Routes", routes);
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete("Routes");
  }
};
