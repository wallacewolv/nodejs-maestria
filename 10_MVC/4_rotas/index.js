const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

const conn = require('./db/connection');

// Models
const Task = require('./models/Task');

// Routes
const tasksRoutes = require('./routes/tasksRoutes');

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

app.use(express.static('public'));

app.use('/tasks', tasksRoutes);

conn
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('App funcionando!');
    });
  })
  .catch((err) => console.log(err));
