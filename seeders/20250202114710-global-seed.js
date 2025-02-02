'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Currencies', [
      {
        shortName: 'USD',
        symbol: '$',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        shortName: 'EUR',
        symbol: '€',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        shortName: 'GBP',
        symbol: '£',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        shortName: 'UAH',
        symbol: '₴',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('Users', [
      {
        username: 'vasya123',
        role: 'user',
        name: 'Vasya Pupkin',
        email: 'v.pupkin@gmail.com',
        password: 'pass1234',
        country: 'Ukraine',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'maxim123',
        role: 'user',
        name: 'Maximilian',
        email: 'maximilian@gmail.com',
        password: 'pass1234',
        country: 'Ukraine',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('ExchangeRates', [
      {
        baseCurrency: 'USD',
        targetCurrency: 'UAH',
        bid: 41.85,
        ask: 42.05,
        nbuRate: 41.9,
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        baseCurrency: 'USD',
        targetCurrency: 'UAH',
        bid: 42.05,
        ask: 41.85,
        nbuRate: 41.9,
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('Accounts', [
      {
        userId: 1,
        currencyId: 1,
        balance: 1000.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        currencyId: 2,
        balance: 800.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        currencyId: 4,
        balance: 50000.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        currencyId: 1,
        balance: 1200.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        currencyId: 4,
        balance: 30000.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Currencies', null, {});
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('ExchangeRates', null, {});
    await queryInterface.bulkDelete('Accounts', null, {});
  },
};
