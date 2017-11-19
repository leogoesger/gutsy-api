"use strict";
const { authorBooks } = require("../seeder-data");

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert("AuthorBooks", authorBooks);
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete("AuthorBooks");
  }
};
