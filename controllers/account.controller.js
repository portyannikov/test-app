const { models } = require('../models/index');
const { Account } = models;

const createAccount = async function (req, res, next) {
  try {
    const account = await Account.create(req.body);

    if (!account) {
      return next(new AppError('No create new account', 400));
    }

    res.status(201).json({
      status: 'success',
      data: {
        account,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAllAccount = async function (req, res, next) {
  try {
    const accounts = await Account.findAll();

    res.status(200).json({
      status: 'success',
      data: {
        account: accounts,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getOneAccount = async function (req, res, next) {
  try {
    const account = await Account.findByPk(req.params.accountId);

    if (!account) {
      return next(new AppError('No found account with that id', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        account,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createAccount, getAllAccount, getOneAccount };
