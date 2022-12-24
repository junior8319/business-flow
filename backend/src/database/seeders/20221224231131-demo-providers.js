'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert(
      'providers',
      [
        {
          name: 'CEDENTE 002',
          tradingName: 'CEDENTE 002 LTDA',
          createdAt: new Date(),
          updatedAt: new Date(),
          cnpjId: 2,
        },
      ],
    );
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('providers', null, {});
  }
};
