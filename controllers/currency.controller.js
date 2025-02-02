const { models } = require('../models/index');
const AppError = require('../utils/appError');

const { Currency } = models;

const createCurrency = async function (req, res, next) {
  try {
    console.log(req.body.symbol);
    const currency = await Currency.create(req.body);

    if (!currency) {
      return next(
        new AppError(
          'Currency not created! Provide correct data and try again!',
          400
        )
      );
    }

    res.status(201).json({
      status: 'success',
      data: {
        currency,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAllCurrencies = async function (req, res, next) {
  try {
    const currencies = await Currency.findAll();

    res.status(200).json({
      status: 'success',
      data: {
        currency: currencies,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getCurrencyById = async function (req, res, next) {
  try {
    const currency = await Currency.findByPk(req.params.currencyId);

    if (!currency) {
      return next(new AppError('No currency with that Id!', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        currency,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createCurrency, getAllCurrencies, getCurrencyById };
