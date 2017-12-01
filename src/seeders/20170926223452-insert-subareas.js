'use strict';
const {subareas} = require('../seeder-data');

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('Subareas', subareas);
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('Subareas');
  },
};
