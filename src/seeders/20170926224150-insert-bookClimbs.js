'use strict';
const {bookClimbs} = require('../seeder-data');

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('BookClimbs', bookClimbs);
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('BookClimbs');
  },
};
