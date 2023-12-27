const express = require('express');
const exphbs = require('express-handlebars');
const conn = require('./db/connection');

const User = require('./models/User');

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

app.post('/users/create', async (req, res) => {
  const name = req.body.name;
  const occupation = req.body.occupation;
  const newsletter = req.body.newsletter === 'on';

  await User.create({ name, occupation, newsletter });

  res.redirect('/');
});

app.get('/users/:id', async (req, res) => {
  const id = req.params.id;

  const user = await User.findOne({ raw: true, where: { id: id } });

  res.render('userview', { user });
});

app.get('/users/create', (req, res) => {
  res.render('adduser');
});

app.get('/', async (req, res) => {
  const users = await User.findAll({ raw: true });

  res.render('home', { users });
});

conn
  .sync()
  .then(() => {
    console.log('Conectamos com sucesso com o Sequelize!');

    app.listen(3000, () => {
      console.log('App funcionando!');
    });
  })
  .catch((err) => console.log(err));
