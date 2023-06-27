const getBook = "SELECT * FROM book";
const getBookById = "SELECT * FROM BOOK WHERE book_no = $1";
const checkTitleExists = 'SELECT * FROM BOOK s WHERE s.book_name = $1'
const addBook = 'INSERT INTO BOOK(book_no, book_name, book_pubyear, book_pages, book_pub_name, book_store_id) VALUES ($1, $2, $3, $4, $5, $6)'
const deleteBook = 'DELETE FROM BOOK WHERE book_no = $1';
const updateBook = 'UPDATE book SET book_name = $2, book_pubyear = $3, book_pages = $4, book_pub_name = $5, book_store_id = $6 WHERE book_no = $1';

module.exports = {
    getBook,
    getBookById,
    checkTitleExists,
    addBook,
    deleteBook,
    updateBook,
};