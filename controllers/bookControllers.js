const bookService = require('../services/bookServices')

module.exports = function bookController() {
    const bookServiceInstance = new bookService();

    //Add new books
    this.addBook = async (req, res) => {
        const data = await bookServiceInstance.addBook(req.body);
        return res.status(data.statusCode).json(data.data);
    }

    //Get all books
    this.getBooks = async (req, res) => {
        const data = await bookServiceInstance.getBooks();
        return res.status(data.statusCode).json(data.data);
    }

    //Get one book
    this.getOneBook = async (req, res) => {
        const data = await bookServiceInstance.getOneBook(req.params);
        return res.status(data.statusCode).json(data.data);
    }

    //Update one book
    this.updateOneBook = async (req, res) => {
        const data = await bookServiceInstance.updateOneBook(req.params, req.body);
        return res.status(data.statusCode).json(data.data);
    }

    //Delete one book
    this.deleteOneBook = async (req, res) => {
        const data = await bookServiceInstance.deleteOneBook(req.params);
        return res.status(data.statusCode).json(data.data);
    }
}