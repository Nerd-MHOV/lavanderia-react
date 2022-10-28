'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('collaborators', 'fingerprint', {
      type: Sequelize.INTEGER,
      after: "cpf",
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('collaborators', 'fingerprint')
  }
};
