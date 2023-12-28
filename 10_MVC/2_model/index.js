const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

const conn = require('./db/connection');

const Task = require('./models/Task');

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

app.use(express.static('public'));

conn
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('App funcionando!');
    });
  })
  .catch((err) => console.log(err));
