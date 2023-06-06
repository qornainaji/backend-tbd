const pool = require('../../db');
const queries = require('./queries');

const getBook = (req, res) => {
    pool.query(queries.getBook, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getBookById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getBookById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const addBook = (req, res) => {
    const { id, title, auth_id, publication_year, pages, price, pub_id, last_update } = req.body;
    pool.query(queries.checkTitleExists, [title], (error, results) => {
        if (results.rows.length) {
            res.send("Book already exists.");
        }
        pool.query(queries.addBook, [id, title, auth_id, publication_year, pages, price, pub_id, last_update], (error, results) => {
            if(error) throw error;
            res.status(201).send(`Book added with title: ${title}`);
        });
    });
};

const updateBook = (req, res) => {
    const id = parseInt(req.params.id);
    const { title, auth_id, publication_year, pages, price, pub_id, last_update } = req.body;
    pool.query(queries.getBookById, [id], (error, results) => {
        const noBookFound = !results.rows.length;
        if (noBookFound){
            res.send("Book doesn't exist in the database.")
        }

        pool.query(queries.updateBook, [title, auth_id, publication_year, pages, price, pub_id, last_update, id], (error, results) => {
            if (error) throw error;
            res.status(200).send(`Book updated with ID: ${id}`);
        });
    });
};

const deleteBook = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getBookById, [id], (error, results) => {
        const noBookFound = !results.rows.length;
        if (noBookFound){
            res.send("Book doesn't exist in the database.")
        }
        pool.query(queries.deleteBook, [id], (error, results) => {
            if (error) throw error;
            res.status(200).send(`Book deleted with id: ${id}`);
        });
    });
};

module.exports = {
    getBook,
    getBookById,
    addBook,
    deleteBook,
    updateBook,
};