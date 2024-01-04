const express = require('express');

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

// rotas - endpoints
app.get('/', (req, res) => {
  res.json({ message: 'Primeira rota criado com sucesso!' });
});

app.post('/createproduct', (req, res) => {
  const { name, price } = req.body;
  console.log({ name, price });

  res.json({ message: `O produto ${name} foi criado com sucesso` });
});

app.listen(3000, () => {
  console.log('API funcionando!');
});
