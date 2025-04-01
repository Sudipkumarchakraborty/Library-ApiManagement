const express = require('express');
const { createUsers,updateUsers, getUsers, getUserById } = require('../controllers/usersController');
const checkEmail = require('../middlewares/checkEmail');

const router = express.Router();

router.post('/', checkEmail, createUsers);
router.put('/:id', updateUsers);
router.get('/', getUsers);
router.get('/:id', getUserById);

module.exports = router;
