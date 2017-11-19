'use strict';
const {regions} = require('../seeder-data');

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('Regions', regions);
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('Regions');
  },
};
