'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'offers',
      {
        id: {
          type:Sequelize.INTEGER(11),
          allowNull: false,
          autoIncrement: true,
          initialAutoIncrement: 40,
          primaryKey: true,
        },
        tax: {
          type:Sequelize.STRING,
          allowNull: false,
        },
        tariff: {
          type:Sequelize.STRING,
          allowNull: false,
        },
        adValorem: {
          type:Sequelize.STRING,
          allowNull: false,
        },
        float: {
          type:Sequelize.STRING,
          allowNull: false,
        },
        iof: {
          type:Sequelize.STRING,
          allowNull: false,
        },
        expiresIn: {
          type:Sequelize.DATE,
          allowNull: false,
        },
        paymentStatusSponsor: {
          type:Sequelize.TINYINT(1),
          allowNull: false,
          defaultValue: 0,
        },
        paymentStatusProvider: {
          type:Sequelize.TINYINT(1),
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
        orderId: {
          type:Sequelize.INTEGER(11),
          allowNull: true,
          defaultValue: null,
          references: { model: 'orders', key: 'id' },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        },
        sponsorId: {
          type:Sequelize.INTEGER(11),
          allowNull: true,
          defaultValue: null,
          references: { model: 'sponsors', key: 'id' },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        },
      },
    );
  },

  async down (queryInterface) {
    await queryInterface.dropTable('offers');
  }
};
