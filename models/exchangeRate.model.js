const { DataTypes } = require('sequelize');

const ExchangeRatesModel = function (sequelize) {
  const ExchangeRate = sequelize.define(
    'ExchangeRate',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      baseCurrency: {
        type: DataTypes.STRING(3),
        allowNull: false,
      },
      targetCurrency: {
        type: DataTypes.STRING(3),
        allowNull: false,
      },
      bid: {
        type: DataTypes.DECIMAL(10, 6),
        allowNull: false,
      },
      ask: {
        type: DataTypes.DECIMAL(10, 6),
        allowNull: false,
      },
      nbuRate: {
        type: DataTypes.DECIMAL(10, 6),
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  return ExchangeRate;
};

module.exports = ExchangeRatesModel;
