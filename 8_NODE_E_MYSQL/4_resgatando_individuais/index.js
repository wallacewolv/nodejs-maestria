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

  console.log(title, pageqty);
  const insert = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`;

  conn.query(insert, function (err) {
    if (err) {
      console.log(err);
    }

    console.log(`Executou a query INSERT do livro ${title} com ${pageqty} páginas!`);
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

    console.log('Executou a query SELECT!');
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

    console.log(`Executou a query SELECT com WHERE no id: ${id}!`);
    console.log(book);

    res.render('book', { book });
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

