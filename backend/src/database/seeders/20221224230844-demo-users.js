'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'ALLAN SOUZA',
          email: 'allan@cashforce.com.br',
          verificationCode: '',
          emailChecked: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          cashforceAdm: 1,
        },
      ],
    );
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
