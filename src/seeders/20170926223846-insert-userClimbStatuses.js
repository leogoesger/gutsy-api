'use strict';
const {userClimbStatuses} = require('../seeder-data');

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('UserClimbStatuses', userClimbStatuses);
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('UserClimbStatuses');
  },
};
