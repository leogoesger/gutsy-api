'use strict';
const {userRoutes} = require('../seeder-data');

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('UserRoutes', userRoutes);
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('UserRoutes');
  },
};
