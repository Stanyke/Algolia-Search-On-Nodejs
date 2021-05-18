const bookController = require('../controllers/bookControllers');
const router = require('express').Router();
const validator = require('../middlewares/validator')
const bookValidator = require('../validators/bookValidator')

module.exports = function () {
    const bookCtrl = new bookController();

    router.post('/addBook', validator(bookValidator.addBookSchema), bookCtrl.addBook);
    router.get('/getBooks', (bookCtrl.getBooks));
    router.get('/books/:id', (bookCtrl.getOneBook));
    router.patch('/books/:id', (bookCtrl.updateOneBook));
    router.delete('/books/:id', (bookCtrl.deleteOneBook));


    return router;
}