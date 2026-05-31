const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/', bookController.getAllBooks);
router.get('/add', bookController.showAddForm);
router.post('/add', bookController.addBook);
router.get('/edit/:id', bookController.showEditForm);
router.post('/edit/:id', bookController.updateBook);
router.post('/delete/:id', bookController.deleteBook);

module.exports = router;
