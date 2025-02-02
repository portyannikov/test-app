const {
  createCurrency,
  getAllCurrencies,
  getCurrencyById,
} = require('../controllers/currency.controller');

const router = require('express').Router();

router.get('/', getAllCurrencies);
router.get('/:currencyId', getCurrencyById);
router.post('/', createCurrency);

module.exports = router;
