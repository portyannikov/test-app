const {
  createAccount,
  getAllAccount,
  getOneAccount,
} = require('../controllers/account.controller');

const router = require('express').Router();

router.get('/', getAllAccount);
router.get('/:accountId', getOneAccount);
router.post('/', createAccount);

module.exports = router;
