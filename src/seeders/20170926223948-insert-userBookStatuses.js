'use strict';
const {userBookStatuses} = require('../seeder-data');

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('UserBookStatuses', userBookStatuses);
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('UserBookStatuses');
  },
};
