const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

const products = [
  {
    id: 1,
    title: 'Notebbok',
    price: 6999.99
  },
  {
    id: 2,
    title: 'Cadeira Gamer',
    price: 899.99
  },
  {
    id: 3,
    title: 'Mouse',
    price: 34.99
  },
  {
    id: 4,
    title: 'Monitor 29"',
    price: 1200.00
  },
];

app.get("/", function (req, res) {
  res.render("home", { products });
});

app.get("/product/:id", function (req, res) {
  const product = products.filter(pd => parseInt(pd.id) == req.params.id)[0];

  res.render("product", { product });
});

app.listen(3000, () => {
  console.log('App funcionando!');
});
