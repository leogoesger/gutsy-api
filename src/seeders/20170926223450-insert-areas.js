'use strict';
const {areas} = require('../seeder-data');

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('Areas', areas);
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('Areas');
  },
};
