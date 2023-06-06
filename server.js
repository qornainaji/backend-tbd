const express = require('express')
const bookRoutes = require('./src/book_store/routes');

const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('tbd')
})

app.use('/api/book', bookRoutes);

app.listen(port, () => console.log(`app listening on port ${port}!`))