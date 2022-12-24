'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'orders',
      {
        id: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
          autoIncrement: true,
          initialAutoIncrement: 540,
          primaryKey: true,
        },
        orderNfId: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        orderNumber: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        orderPath: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
          unique: true,
        },
        orderFileName: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
          unique: true,
        },
        orderOriginalName: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
          unique: true,
        },
        emissionDate: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        pdfFile: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        emitedTo: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        nNf: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        CTE: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        value: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        cnpjId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: null,
          references: { model: 'cnpjs', key: 'id' },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: null,
          references: { model: 'users', key: 'id' },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        },
        buyerId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: null,
          references: { model: 'buyers', key: 'id' },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        },
        providerId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: null,
          references: { model: 'providers', key: 'id' },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        },
        orderStatusBuyer: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: '0',
        },
        orderStatusProvider: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: '0',
        },
        deliveryReceipt: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        cargoPackingList: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        deliveryCtrc: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
      },
    );
  },

  async down (queryInterface) {
    await queryInterface.dropTable('orders');
  }
};
