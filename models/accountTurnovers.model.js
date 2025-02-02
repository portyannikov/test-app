const { DataTypes } = require('sequelize');

const AccountTurnoversModel = function (sequelize) {
  const AccountTurnovers = sequelize.define(
    'AccountTurnovers',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      accountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      turnoverOut: {
        //входящий оборот
        type: DataTypes.DECIMAL(10, 6),
      },
      turnoverIn: {
        type: DataTypes.DECIMAL(10, 6),
      },
    },
    {
      timestamps: true,
    }
  );

  return AccountTurnovers;
};

module.exports = AccountTurnoversModel;
