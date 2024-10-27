// src/routes/product.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware.verifyToken);

router.get('/', productController.getAllProducts);
router.get('/:product_id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:product_id', productController.updateProduct);
router.delete('/:product_id', productController.deleteProduct);

module.exports = router;
