'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('returns', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      collaborator_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: { model: 'collaborators', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      responsible_in_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: { model: 'collaborators', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      responsible_out_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: { model: 'collaborators', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: { model: 'users', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: { model: 'products', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      amount_has: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      amount_bad:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status_in: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      status_out: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      obs_in: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      obs_out: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      date_in: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      date_out: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('returns');
  }
};
