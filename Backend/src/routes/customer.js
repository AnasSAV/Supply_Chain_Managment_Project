// src/routes/customer.js
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware.verifyToken);

router.post('/register', customerController.register);
router.post('/get-order-details', customerController.getOrderDetails);
module.exports = router;
