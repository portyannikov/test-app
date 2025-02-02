const { models } = require('../models/index');
const AppError = require('../utils/appError');
const { User } = models;

const createUser = async function (req, res, next) {
  try {
    const newUser = await User.create(req.body);

    if (!newUser) {
      return next(new AppError('User has not been created!', 400));
    }

    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async function (req, res, next) {
  try {
    const users = await User.findAll();

    res.status(200).json({
      status: 'success',
      data: {
        user: users,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getOneUser = async function (req, res, next) {
  try {
    const user = await User.findByPk(req.params.userId);

    if (!user) {
      return next(new AppError('User not found with that Id!', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, getAllUsers, getOneUser };
