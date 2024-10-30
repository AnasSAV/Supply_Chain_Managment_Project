const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware.verifyToken);
router.use(authMiddleware.requireRole('driver'));

router.post('/get-trip-details', driverController.getTripDetailsByDriver);

module.exports = router; 