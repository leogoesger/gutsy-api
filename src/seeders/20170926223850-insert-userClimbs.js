'use strict';
const {userClimbs} = require('../seeder-data');

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('UserClimbs', userClimbs);
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('UserClimbs');
  },
};
