const { DataTypes } = require('sequelize');

const TransactionModel = function (sequelize) {
  const Transaction = sequelize.define(
    'Transaction',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      amount: {
        type: DataTypes.DECIMAL(14, 2),
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM('credit', 'debit'),
        allowNull: false,
      },
      operation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      accountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      currencyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      transactionPackageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  return Transaction;
};

module.exports = TransactionModel;
