const { DataTypes } = require('sequelize');

const CurrencyModel = function (sequelize) {
  const Currency = sequelize.define(
    'Currency',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      symbol: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      shortName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  return Currency;
};

module.exports = CurrencyModel;
