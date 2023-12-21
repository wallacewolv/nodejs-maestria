const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.get('/dashboard', (req, res) => {
  const items = ["Item a", "Item b", "Item c"];

  res.render('dashboard', { items });
});

app.get('/post', (req, res) => {
  const post = {
    title: 'Aprender Node.js',
    category: 'Javascript',
    body: 'Este artigo vai te ajudar a aprender Node.js...',
    comments: 4,
  };

  res.render('blogpost', { post });
});

app.get('/', (req, res) => {
  const user = {
    name: "Wallace",
    surname: "Wesley",
    age: 29,
  };

  const palavra = "Teste";
  const auth = false;
  const approved = true;

  res.render('home', { user, palavra, auth, approved });
});

app.listen(3000, () => {
  console.log('App funcionando!');
});



