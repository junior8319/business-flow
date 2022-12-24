
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'sponsors',
      {
        id: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
          autoIncrement: true,
          initialAutoIncrement: 17,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        tradingName: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        cashforceTax: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        responsibleName: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        responsibleEmail: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        responsiblePosition: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        responsiblePhone: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        responsibleMobile: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        website: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        postalCode: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        address: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        number: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        complement: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        neighborhood: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        city: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        state: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        bank: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        bankAgency: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        account: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        phoneNumber: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        situation: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        situationDate: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        cnpjId: {
          type: Sequelize.INTEGER(11),
          allowNull: true,
          defaultValue: null,
          references: { model: 'cnpjs', key: 'id' },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        },
        email: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
      },
    );
  },

  async down (queryInterface) {
    await queryInterface.dropTable('sponsors');
  }
};
