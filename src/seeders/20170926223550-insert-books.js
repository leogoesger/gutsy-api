'use strict';
const {books} = require('../seeder-data');

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('Books', books);
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('Books');
  },
};
