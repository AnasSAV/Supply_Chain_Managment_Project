// src/routes/order.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const orderController = require('../controllers/orderController');

router.use(authMiddleware.verifyToken);
router.use(authMiddleware.requireRole('customer'));
// Routes accessible by customers
router.get('/', orderController.getCustomerOrders);
router.post('/', orderController.placeOrder);

// Route accessible only by managers

module.exports = router;
