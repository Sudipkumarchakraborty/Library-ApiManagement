const express = require('express');
const { createUsers,updateUsers, getUsers, getUserById } = require('../controllers/usersController');

const router = express.Router();

router.post('/', createUsers);
router.put('/:id', updateUsers);
router.get('/', getUsers);
router.get('/:id', getUserById);

module.exports = router;
