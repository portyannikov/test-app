const {
  getAllUsers,
  getOneUser,
  createUser,
} = require('../controllers/user.controller');

const router = require('express').Router();

router.get('/', getAllUsers);
router.get('/:userId', getOneUser);
router.post('/', createUser);

module.exports = router;
