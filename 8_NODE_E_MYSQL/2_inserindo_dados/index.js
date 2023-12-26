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
  const sql = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`;

  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
    }

    console.log('Executou a query!');
    res.redirect('/');
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

