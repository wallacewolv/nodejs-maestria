const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');

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

  const insert = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`;

  conn.query(insert, function (err) {
    if (err) {
      console.log(err);
    }

    console.log(insert);
    res.redirect('/books');
  });
});

app.get('/books', (req, res) => {
  const select = "SELECT * FROM books";

  conn.query(select, function (err, data) {
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

  const selectWhere = `SELECT * FROM books WHERE id = '${id}'`;

  conn.query(selectWhere, function (err, data) {
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

  const selectWhere = `SELECT * FROM books WHERE id = '${id}'`;

  conn.query(selectWhere, function (err, data) {
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
  console.log({ id, title, pageqty });

  const updateWhere = `UPDATE books SET title = '${title}', pageqty = '${pageqty}' WHERE id = ${id}`;

  conn.query(updateWhere, function (err) {
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

  const remove = `DELETE FROM books WHERE id = ${id}`;

  conn.query(remove, function (err) {
    if (err) {
      console.log(err);
      return;
    }

    console.log(remove);

    res.redirect('/books');
  });
});

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodemysql',
});

conn.connect(function (err) {
  if (err) {
    console.log(err);
  }

  console.log('Conectou ao MySQL!');

  app.listen(3000, () => {
    console.log('App funcionando!');
  });
})

