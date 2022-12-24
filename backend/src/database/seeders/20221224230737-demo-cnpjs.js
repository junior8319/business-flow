
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert(
      'cnpjs',
      [
        {
          cnpj: '00000000000001',
          companyType: '2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          cnpj: '00000000000002',
          companyType: '1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    );
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('cnpjs', null, {});
  }
};
