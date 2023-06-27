const { Router } = require('express');
const controller = require('./controller');

const router = Router();

// router.get('/', controller.getBook);
router.post('/', controller.addBook);
router.get('/:book_no', controller.getBookById);
router.put('/:book_no', controller.updateBook);
router.delete('/:book_no', controller.deleteBook);

module.exports = router;