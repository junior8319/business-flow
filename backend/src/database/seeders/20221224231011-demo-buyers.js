'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert(
      'buyers',
      [
        {
          name: 'SACADO 001',
          tradingName: 'SACADO 001 LTDA',
          cashforceTax: '0',
          createdAt: new Date(),
          updatedAt: new Date(),
          cnpjId: 1,
          confirm: 1,
        },
      ],
    );
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('buyers', null, {});
  }
};
