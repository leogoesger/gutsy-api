'use strict';
const {bookRoutes} = require('../seeder-data');

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('BookRoutes', bookRoutes);
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('BookRoutes');
  },
};
