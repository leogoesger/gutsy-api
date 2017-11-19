'use strict';
const {authors} = require('../seeder-data');

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('Authors', authors);
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('Authors');
  },
};
