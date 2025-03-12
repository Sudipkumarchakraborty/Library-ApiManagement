const express = require('express');
const router = express.Router();
const { createCategory } = require('../controllers/categoriesController'); // Import the controller function

// Route to create a new category
router.post('/Category', createCategory);

module.exports = router;
