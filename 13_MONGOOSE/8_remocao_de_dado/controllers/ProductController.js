const Product = require('../models/Product');

module.exports = class ToughController {
  static async showProducts(req, res) {
    const products = await Product.find().lean();

    console.log('showProducts');

    res.render('products/all', { products });
  };

  static createProduct(req, res) {
    res.render('products/create');
  };

  static async createProductPost(req, res) {
    const { name, image, price, description } = req.body;

    console.log('createProductPost', { name, image, price, description });

    const product = new Product({ name, image, price, description });

    await product.save();

    res.redirect('/products');
  };

  static async getProduct(req, res) {
    const id = req.params.id;

    console.log('getProduct: ', id);

    const product = await Product.findById(id).lean();

    console.log('getProduct: ', product.name);

    res.render('products/product', { product });
  };

  static async removeProduct(req, res) {
    const id = req.params.id;

    console.log('removeProduct: ', id);

    await Product.deleteOne({ _id: id });

    res.redirect('/products');
  };

  static async editProduct(req, res) {
    const id = req.params.id;

    console.log('editProduct: ', id);

    const product = await Product.findById(id).lean();

    console.log('editProduct: ', product.name);

    res.render('products/edit', { product });
  };

  static async editProductPost(req, res) {
    const { id, name, image, price, description } = req.body;

    console.log('editProductPost: ', id);

    const product = { name, image, price, description };

    console.log('editProductPost: ', name);

    await Product.updateOne({ _id: id }, product);

    res.redirect('/products');
  };
}
