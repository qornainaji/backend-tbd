const express = require('express');
const pool = require('./db');
// const bookRoutes = require('./src/book_store/routes');
// const queries = require('./src/book_store/queries');

const app = express();
const port = 3001;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your application's domain
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('tbd')
})

// app.use('/api/book', bookRoutes);

app.get('/api/book',  async(req, res) => {
    try {
        const result = await pool.query('SELECT * FROM book');
        res.status(200).json(result.rows);
      } catch (error) {
        console.error('Query error:', error);
        res.status(500).json({ success: false, message: 'An error occurred while retrieving data from the database.' });
      }
});


app.put('/api/book/:book_no', async (req, res) => {
    try {
      const book_no = parseInt(req.params.book_no);
      const { book_name, book_pubyear, book_pages, book_pub_name, book_store_id } = req.body;
  
      const { rows } = await pool.query("SELECT * FROM BOOK WHERE book_no = $1", [book_no]);
      const noBookFound = rows.length === 0;
  
      if (noBookFound) {
        return res.send("Book doesn't exist in the database.");
      }
  
      await pool.query('UPDATE book SET book_name = $2, book_pubyear = $3, book_pages = $4, book_pub_name = $5, book_store_id = $6 WHERE book_no = $1', [book_no, book_name, book_pubyear, book_pages, book_pub_name, book_store_id]);
  
      res.status(200).send(`Book updated with ID: ${book_no}`);
      console.log(req.body);
    } catch (error) {
      console.log(req.body);
      res.status(500).send("An error occurred while updating the book.");
    }
  });

app.post('/api/book', async (req, res) => {
    try {
      const { book_no, book_name, book_pubyear, book_pages, book_pub_name, book_store_id } = req.body;
  
      const { rows } = await pool.query('SELECT * FROM BOOK s WHERE s.book_no = $1', [book_no]);
      if (rows.length) {
        return res.send("Book already exists.");
      }
  
      await pool.query('INSERT INTO BOOK(book_no, book_name, book_pubyear, book_pages, book_pub_name, book_store_id) VALUES ($1, $2, $3, $4, $5, $6)', [book_no, book_name, book_pubyear, book_pages, book_pub_name, book_store_id]);
  
      res.status(201).send(`Book added with title: ${book_name}`);
      console.log(req.body);
    } catch (error) {
      console.log(req.body);
      res.status(500).send("An error occurred while adding the book.");
    }
  });

app.get('/api/book/:book_no', async (req, res) => {
    try {
      const book_no = parseInt(req.params.book_no);
  
      const { rows } = await pool.query("SELECT * FROM BOOK WHERE book_no = $1", [book_no]);
  
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).send("An error occurred while fetching the book.");
    }
  });

app.delete('/api/book/:book_no', async (req, res) => {
  const client = await pool.connect();
  try {
      await client.query('BEGIN');
      const book_no = parseInt(req.params.book_no);
      const results = await pool.query("SELECT * FROM BOOK WHERE book_no = $1", [book_no]);
      const noBookFound = !results.rows.length;
      
      if (noBookFound) {
          return res.send("Book doesn't exist in the database.");
      }
      
      await pool.query('DELETE FROM BOOK WHERE book_no = $1', [book_no]);
      res.status(200).send(`Book deleted with id: ${book_no}`);
      await client.query('COMMIT');
  } catch (error) {
      await client.query('ROLLBACK');
      throw error;
  } finally {
      client.release();
  }
});

app.post('/api/sql',  async(req, res) => {
  try{
      await pool.query("BEGIN");
      const { queries } = req.body;
      pool.query(queries, (error, results) => {   
          if (error) throw error;
          res.status(200).json(results.rows);
      });
      await pool.query("COMMIT");
  } catch (error) {
      await pool.query("ROLLBACK");
      console.error('Error executing queries:', error);
      res.status(500).json({ error: 'An error occurred while executing the queries.' });
  }
});




app.listen(port, () => console.log(`app listening on port ${port}!`))