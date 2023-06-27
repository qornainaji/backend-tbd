const pool = require('../../db');
const queries = require('./queries');

// const getBook = (req, res) => {
//     pool.query(queries.getBook, (error, results) => {
//         if (error) throw error;
//         res.status(200).json(results.rows);
//     });
// };

// const getBookById = (req, res) => {
//     const book_no = parseInt(req.params.book_no);
//     pool.query(queries.getBookById, [book_no], (error, results) => {
//         if (error) throw error;
//         res.status(200).json(results.rows);
//     });
// };

// const addBook = (req, res) => {
//     const { book_no, book_name, book_pubyear, book_pages, book_pub_name, book_store_id } = req.body;
//     pool.query(queries.checkTitleExists, [book_name], (error, results) => {
//         if (results.rows.length) {
//             res.send("Book already exists.");
//         }
//         pool.query(queries.addBook, [book_no, book_name, book_pubyear, book_pages, book_pub_name, book_store_id], (error, results) => {
//             if(error) throw error;
//             res.status(201).send(`Book added with title: ${book_name}`);
//         });
//     });
// };

// const updateBook = (req, res) => {
//     const book_no = parseInt(req.params.book_no);
//     const { book_name, book_pubyear, book_pages, book_pub_name, book_store_id } = req.body;
//     pool.query(queries.getBookById, [book_no], (error, results) => {
//         const noBookFound = !results.rows.length;
//         if (noBookFound){
//             res.send("Book doesn't exist in the database.")
//         }

//         pool.query(queries.updateBook, [book_no, book_name, book_pubyear, book_pages, book_pub_name, book_store_id], (error, results) => {
//             if (error) throw error;
//             res.status(200).send(`Book updated with ID: ${book_no}`);
//         });
//     });
// };

// const updateBook = async (req, res) => {
//     try {
//       const book_no = parseInt(req.params.book_no);
//       const { book_name, book_pubyear, book_pages, book_pub_name, book_store_id } = req.body;
  
//       const { rows } = await pool.query(queries.getBookById, [book_no]);
//       const noBookFound = rows.length === 0;
  
//       if (noBookFound) {
//         return res.send("Book doesn't exist in the database.");
//       }
  
//       await pool.query(queries.updateBook, [book_no, book_name, book_pubyear, book_pages, book_pub_name, book_store_id]);
  
//       res.status(200).send(`Book updated with ID: ${book_no}`);
//     } catch (error) {
//       res.status(500).send("An error occurred while updating the book.");
//     }
//   };

const deleteBook = (req, res) => {
    const book_no = parseInt(req.params.book_no);
    pool.query(queries.getBookById, [book_no], (error, results) => {
        const noBookFound = !results.rows.length;
        if (noBookFound){
            res.send("Book doesn't exist in the database.")
        }
        pool.query(queries.deleteBook, [book_no], (error, results) => {
            if (error) throw error;
            res.status(200).send(`Book deleted with id: ${book_no}`);
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