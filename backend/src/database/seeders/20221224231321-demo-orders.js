'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert(
      'orders',
      [
        {
          orderNfId: '1605181324132',
          orderNumber: '18153',
          emissionDate: '2020-10-30T11:00:00-03:00',
          emitedTo: '22843980000127',
          nNf: '18153',
          CTE: '',
          value: '198450',
          createdAt: new Date(),
          updatedAt: new Date(),
          cnpjId: 1,
          userId: 1,
          buyerId: 1,
          providerId: 1,
          orderStatusBuyer: '0',
          orderStatusProvider: '0',
        },

        {
          orderNfId: '160518132413',
          orderNumber: '18157',
          emissionDate: '2020-11-04T15:32:35-02:00',
          emitedTo: '35705180000272',
          nNf: '18157',
          CTE: '',
          value: '168850',
          createdAt: new Date(),
          updatedAt: new Date(),
          cnpjId: 1,
          userId: 1,
          buyerId: 1,
          providerId: 1,
          orderStatusBuyer: '0',
          orderStatusProvider: '0',
        },

        {
          orderNfId: '1605181324130',
          orderNumber: '18184',
          emissionDate: '2020-11-10',
          emitedTo: '00418477002640',
          nNf: '18184',
          CTE: '',
          value: '222795',
          createdAt: new Date(),
          updatedAt: new Date(),
          cnpjId: 1,
          userId: 1,
          buyerId: 1,
          providerId: 1,
          orderStatusBuyer: '7',
          orderStatusProvider: '3',
        },
      ],
    );
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('orders', null, {});    
  }
};
