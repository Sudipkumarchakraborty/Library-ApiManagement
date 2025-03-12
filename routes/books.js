const express = require('express');
const { createBook, getBooks, getBooksById, deleteBook } = require('../controllers/booksController');

const router = express.Router();

router.post('/', createBook);
router.get('/', getBooks);
router.get('/:id', getBooksById);
router.delete('/:id', deleteBook);

module.exports = router;

