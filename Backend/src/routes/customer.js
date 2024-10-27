// src/routes/customer.js
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customercontroller');


router.post('/register', customerController.register);

module.exports = router;
