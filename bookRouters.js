const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Define routes and link to controller methods
router.get('/', bookController.getAllBooks);           // READ all
router.get('/add', bookController.showAddForm);        // Show add form
router.post('/add', bookController.addBook);           // CREATE
router.get('/edit/:id', bookController.showEditForm);  // Show edit form
router.post('/edit/:id', bookController.updateBook);   // UPDATE
router.post('/delete/:id', bookController.deleteBook); // DELETE

module.exports = router;