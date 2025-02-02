require('dotenv').config();
const { Sequelize } = require('sequelize');
const config = require('../config/config');

// import models
const CurrencyModel = require('./currency.model');
const AccountModel = require('./account.model');
const ExchangeRatesModel = require('./exchangeRate.model');
const TransactionPackageModel = require('./transactionPackages.model');
const TransactionModel = require('./transaction.model');
const AccountTurnoversModel = require('./accountTurnovers.model');
const UserModel = require('./user.model');

const sequelize = new Sequelize(config[process.env.NODE_ENV]);

const Currency = CurrencyModel(sequelize);
const Account = AccountModel(sequelize);
const ExchangeRate = ExchangeRatesModel(sequelize);
const TransactionPackage = TransactionPackageModel(sequelize);
const Transaction = TransactionModel(sequelize);
const AccountTurnover = AccountTurnoversModel(sequelize);
const User = UserModel(sequelize);

Currency.hasMany(Account, { foreignKey: 'currencyId' });
Account.belongsTo(Currency, { foreignKey: 'currencyId' });

User.hasMany(Account, { foreignKey: 'userId' });
Account.belongsTo(User, { foreignKey: 'userId' });

Account.hasMany(Transaction, { foreignKey: 'accountId' });
Transaction.belongsTo(Account, { foreignKey: 'accountId' });

Currency.hasMany(Transaction, { foreignKey: 'currencyId' });
Transaction.belongsTo(Currency, { foreignKey: 'currencyId' });

TransactionPackage.hasMany(Transaction, { foreignKey: 'transactionPackageId' });
Transaction.belongsTo(TransactionPackage, {
  foreignKey: 'transactionPackageId',
});

Account.hasMany(AccountTurnover, { foreignKey: 'accountId' });
AccountTurnover.belongsTo(Account, { foreignKey: 'accountId' });

module.exports = {
  sequelize,
  Sequelize,
  models: {
    User,
    Currency,
    Account,
    ExchangeRate,
    TransactionPackage,
    Transaction,
    AccountTurnover,
  },
};
