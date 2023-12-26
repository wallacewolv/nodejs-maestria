const express = require('express');
const exphbs = require('express-handlebars');
const pool = require('./db/connection');

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home');
});

app.post('/books/insertbook', (req, res) => {
  const { title, pageqty } = req.body;

  const insert = `INSERT INTO books (??, ??) VALUES (?,?)`;
  const dataInsert = ['title', 'pageqty', title, pageqty];

  pool.query(insert, dataInsert, function (err) {
    if (err) {
      console.log(err);
    }

    console.log(insert);

    res.redirect('/books');
  });
});

app.get('/books', (req, res) => {
  const select = "SELECT * FROM books";

  pool.query(select, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const books = data;

    console.log(select);
    console.log(books);

    res.render('books', { books });
  });
});

app.get('/books/:id', (req, res) => {
  const id = req.params.id;

  const selectWhere = `SELECT * FROM books WHERE ?? = ?`;
  const dataSelect = ['id', id];

  pool.query(selectWhere, dataSelect, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const book = data[0];

    console.log(selectWhere);
    console.log(book);

    res.render('book', { book });
  });
});

app.get('/books/edit/:id', (req, res) => {
  const id = req.params.id;

  const selectWhere = `SELECT * FROM books WHERE ?? = ?`;
  const dataSelectWhere = ['id', id];

  pool.query(selectWhere, dataSelectWhere, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const book = data[0];

    console.log(selectWhere);
    console.log(book);

    res.render('editbook', { book });
  });
});

app.post('/books/updatebook', (req, res) => {
  const { id, title, pageqty } = req.body;

  const updateWhere = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?`;
  const dataUpdateWhere = ['title', title, 'pageqty', pageqty, 'id', id];

  pool.query(updateWhere, dataUpdateWhere, function (err) {
    if (err) {
      console.log(err);
      return;
    }

    console.log(updateWhere);

    res.redirect('/books');
  });
});

app.post('/books/remove/:id', (req, res) => {
  const id = req.params.id;

  const remove = `DELETE FROM books WHERE ?? = ?`;
  const dataRemove = ['id', id];

  pool.query(remove, dataRemove, function (err) {
    if (err) {
      console.log(err);
      return;
    }

    console.log(remove);

    res.redirect('/books');
  });
});

app.listen(3000, () => {
  console.log('App funcionando!');
});
