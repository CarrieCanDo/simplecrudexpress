const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());  //Middleware to parse JSON bodies

let books = [];
let idindex = 0;

// POST /books - Create a new book
app.post('/books', (req, res) => {  
    const newBook = {
      id: idindex++,
      title: req.body.title,
      author: req.body.author
    };
    books.push(newBook);
    res.status(201).json(newBook);
  });

  // GET /books - Retrieve all books
app.get('/books', (req, res) => {
    res.status(200).json(books);
  });
  
  // GET /books/:id - Retrieve a single book by id
  app.get('/books/:id', (req, res) => {
    const book = books.find(book => book.id === parseInt(req.params.id));
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    } else {
        res.status(200).json(book);
    }
  });
  
  // PUT /books/:id - Update a book by id
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        res.status(404).send('Book not found');
    } else {
        book.title = req.body.title || book.title;
        book.author = req.body.author || book.author;
        res.status(200).json(book);
    }
});

  // DELETE /books/:id - Delete a book by id
// Route to delete a book by ID
app.delete('/books/:id', (req, res) => {
    const index = books.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) {
        res.status(404).send('Book not found');
    } else {
        books.splice(index, 1);
        res.status(204).send(); // No content to send back
    }
});
  

  
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });