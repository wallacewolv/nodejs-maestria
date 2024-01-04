const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/ProductController');

router.get('/create', ProductController.createProduct);
router.post('/create', ProductController.createProductPost);
// router.post('/remove/:id', ProductController.removeProduct);
// router.get('/', ProductController.showProducts);
// router.get('/:id', ProductController.getProduct);
// router.post('/edit', ProductController.editProductPost);
// router.get('/edit/:id', ProductController.editProduct);

module.exports = router;
