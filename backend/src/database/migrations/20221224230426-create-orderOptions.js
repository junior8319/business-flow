'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'orderOptions',
      {
        id: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
          autoIncrement: true,
          initialAutoIncrement: 612, 
          primaryKey: true,
        },
        nDup: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        dVenc: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        vDup: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        availableToMarket: {
          type: Sequelize.TINYINT,
          defaultValue: 1,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        orderId: {
          type: Sequelize.INTEGER(11),
          allowNull: true,
          defaultValue: null,
          references: { model: 'orders', key: 'id' },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        },
      },
    );
  },

  async down (queryInterface) {

    await queryInterface.dropTable('orderOptions');
  }
};
