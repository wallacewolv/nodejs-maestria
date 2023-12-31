const Product = require('../models/Product');

module.exports = class ToughController {
  static async showProducts(req, res) {
    const products = await Product.getProducts();

    res.render('products/all', { products });
  };

  static createProduct(req, res) {
    res.render('products/create');
  };

  static createProductPost(req, res) {
    const { name, price, description, image } = req.body;

    const product = new Product(name, price, description, image);

    product.save();

    res.redirect('/');
  };

  static async getProduct(req, res) {
    const id = req.params.id;

    const product = await Product.getProductById(id);

    res.render('products/product', { product });
  };

  static removeProduct(req, res) {
    const id = req.params.id;

    Product.removeProduct(id);

    res.redirect('/');
  };

  static async editProduct(req, res) {
    const id = req.params.id;

    const product = await Product.getProductById(id);

    res.render('products/edit', { product });
  };
}
