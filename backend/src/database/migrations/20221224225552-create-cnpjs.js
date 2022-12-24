'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'cnpjs',
      {
        id: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
          autoIncrement: true,
          initialAutoIncrement: 437,
          primaryKey: true,
        },

        cnpj: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },

        companyType: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },

        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
    );
  },

  async down (queryInterface) {
    await queryInterface.dropTable('cnpjs');
  }
};