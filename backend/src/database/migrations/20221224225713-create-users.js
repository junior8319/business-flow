'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'users',
      {
        id: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        phoneNumber: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        mobile: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        departament: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        verificationCode: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        emailChecked: {
          type: Sequelize.TINYINT(1),
          allowNull: false,
          defaultValue: 0,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        cashforceAdm: {
          type: Sequelize.TINYINT(1),
          allowNull: false,
          defaultValue: 0,
        },
      }
    );
  },

  async down (queryInterface) {
    await queryInterface.dropTable('users');
  }
};
