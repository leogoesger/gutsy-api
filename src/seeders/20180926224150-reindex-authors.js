'use strict';
module.exports = {
  up(queryInterface, _Sequelize) {
    queryInterface.sequelize.query(
      "SELECT setval('Authors_id_seq', COALESCE((SELECT MAX(id)+1 FROM Authors), 1), false)"
    );
  },
  down: (queryInterface, _Sequelize) => {
    queryInterface.sequelize.query("SELECT setval('Authors_id_seq', 1, false)");
  },
};
