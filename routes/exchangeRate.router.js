const router = require('express').Router();
const { exchangeCurrency } = require('../controllers/exchangeRates.controller');

router.post('/exchange', exchangeCurrency);

module.exports = router;
