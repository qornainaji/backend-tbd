const getBook = "SELECT * FROM book";
const getBookById = "SELECT * FROM book WHERE id = $1";
const checkTitleExists = 'SELECT * FROM book s WHERE s.title = $1'
const addBook = 'INSERT INTO book (id, title, auth_id, publication_year, pages, price, pub_id, last_update) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)'
const deleteBook = 'DELETE FROM book WHERE id = $1';
const updateBook = 'UPDATE book SET title = $1, auth_id = $2, publication_year = $3, pages = $4, price = $5, pub_id = $6, last_update = $7 WHERE id = $8';

module.exports = {
    getBook,
    getBookById,
    checkTitleExists,
    addBook,
    deleteBook,
    updateBook,
};