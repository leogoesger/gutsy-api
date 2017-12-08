'use strict';
const {subregions} = require('../seeder-data');

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('Subregions', subregions);
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('Subregions');
  },
};
