const { DataTypes } = require('sequelize');

const TransactionPackageModel = function (sequelize) {
  const TransactionPackage = sequelize.define(
    'TransactionPackage',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  return TransactionPackage;
};

module.exports = TransactionPackageModel;
