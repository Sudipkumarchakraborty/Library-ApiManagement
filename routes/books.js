const express = require('express');
const { createBook, getBooks, getBooksById, updateBooks, deleteBook } = require('../controllers/booksController');
const checkIsbn = require('../middlewares/checkIsbn'); 


const router = express.Router();

router.post('/', checkIsbn, createBook);
router.get('/', getBooks);
router.get('/:id', getBooksById);
router.put('/:id', updateBooks);
router.delete('/:id', deleteBook);

module.exports = router;

