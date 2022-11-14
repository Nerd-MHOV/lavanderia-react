'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('config_db', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      config: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      param: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('config_db');
  }
};
