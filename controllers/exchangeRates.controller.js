const { models, sequelize } = require('../models/index');
const AppError = require('../utils/appError');
const { ExchangeRate, Currency, Account, TransactionPackage, Transaction } =
  models;

const getExchangeRates = async function (req, res, next) {
  const exchangeRate = await ExchangeRate.findAll();

  res.status(200).json({
    status: 'success',
    data: {
      exchangeRate,
    },
  });
};

const createExchangeRates = async function (req, res, next) {
  try {
    const newExchangeRate = await ExchangeRate.create({
      baseCurrency: req.body.baseCurrency,
      targetCurrency: req.body.targetCurrency,
      bid: req.body.bid,
      ask: req.body.ask,
      nbuRate: req.body.nbuRate,
      date: Date.now(),
    });

    if (!newExchangeRate) {
      return next(new AppError('Bad Request!', 400));
    }

    res.status(201).json({
      status: 'success',
      data: {
        newExchangeRate,
      },
    });
  } catch (error) {
    next(error);
  }
};

const exchangeCurrency = async function (req, res, next) {
  try {
    const { baseCurrency, targetCurrency, amount, operationType } = req.body;

    if (!baseCurrency || !targetCurrency || !amount || !operationType) {
      return next(
        new AppError(
          'Missing required fields. Provide baseCurrency, targetCurrency, amount and operationType',
          400
        )
      );
    }

    //Проверка наличия курса обмена
    const rate = await ExchangeRate.findOne({
      where: { baseCurrency, targetCurrency },
      order: [['date', 'DESC']],
    });

    if (!rate) {
      return next(new AppError('Exchange rate not found!', 404));
    }

    // const exchangeRate = rate.rate;
    const bidRate = rate.bid;
    const askRate = rate.ask;
    const nbuRate = rate.nbuRate;

    //ищем записи валют, для получения их id
    const targetCurr = await Currency.findOne({
      where: { shortName: targetCurrency },
    });
    const baseCurr = await Currency.findOne({
      where: { shortName: baseCurrency },
    });

    if (!targetCurr) {
      return next(new AppError('Target currency not found!', 404));
    }
    if (!baseCurr) {
      return next(new AppError('Base currency not found!', 404));
    }

    //Проверка баланса счета, существует ли он
    const userAccount = await Account.findOne({
      where: { currencyId: targetCurr.id },
    });

    if (!userAccount || userAccount.balance < amount) {
      return next(new AppError('Insufficient funds', 400));
    }

    // расчет прибыли
    let profit;

    if (operationType === 'sell') {
      profit = (bidRate - nbuRate) * amount;
    } else if (operationType === 'buy') {
      profit = (nbuRate - askRate) * amount;
    }

    const transaction = await sequelize.transaction();

    try {
      // Создаем пакет транзакций для списаний и зачислений
      const transactionPackage = await TransactionPackage.create(
        { status: 'pending' },
        { transaction }
      );

      //списание средств с credit
      await Transaction.create(
        {
          amount,
          type: 'debit',
          operation: 'write-off of funds',
          accountId: userAccount.id,
          currencyId: targetCurr.id,
          transactionPackageId: transactionPackage.id,
        },
        { transaction }
      );

      const exchangedAmount =
        operationType === 'buy' ? amount / askRate : amount * bidRate;

      //зачисление средств на credit
      await Transaction.create(
        {
          amount: exchangedAmount,
          type: 'credit',
          operation: 'crediting funds',
          accountId: userAccount.id,
          currencyId: baseCurr.id,
          transactionPackageId: transactionPackage.id,
        },
        { transaction }
      );

      //проведем учет прибыли и исходя из этого выберем тип credit || debit
      if (profit !== 0) {
        await Transaction.create(
          {
            amount: Math.abs(profit),
            type: profit > 0 ? 'credit' : 'debit',
            operation: 'profit',
            accountId: userAccount.id,
            currencyId: baseCurr.id,
            transactionPackageId: transactionPackage.id,
          },
          { transaction }
        );
      }
      //Фиксируем приход денег
      await transactionPackage.update({ status: 'completed' }, { transaction });
      await transaction.commit();

      res.status(200).json({
        status: 'success',
        exchangeAmount: exchangedAmount,
        profit,
      });
    } catch (error) {
      await transaction.rollback();
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getExchangeRates, createExchangeRates, exchangeCurrency };
