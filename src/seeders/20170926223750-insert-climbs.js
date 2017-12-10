'use strict';
const {climbs} = require('../seeder-data');

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('Climbs', climbs);
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('Climbs');
  },
};
