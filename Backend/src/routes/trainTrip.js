// src/routes/trainTrip.js

const express = require('express');
const router = express.Router();
const trainTripController = require('../controllers/trainTripController');
const authMiddleware = require('../middlewares/auth');
const orderController = require('../controllers/orderController');

// Apply authentication middleware
router.use(authMiddleware.verifyToken);

// Routes that don't require admin role
router.get('/get-branch-order-counts', trainTripController.getBranchOrderCounts);

// Routes that require admin role
router.use(authMiddleware.requireRole('admin')); // Move this after the routes that don't need admin
router.post('/create', trainTripController.createTrainTrip);
router.post('/get-train-trips', trainTripController.getTrainTripsByDateAndBranch);
router.post('/pending', trainTripController.getPendingOrders);
router.post('/get-orders-by-train-and-branch', orderController.getOrdersByTrainAndBranch);
router.post('/get-orders-by-train-and-date', trainTripController.getOrdersByTrainAndDate);
router.get('/get-future-train-trips', trainTripController.getFutureTrainTrips);
router.post('/assign', trainTripController.assignOrder);
router.get('/get-all-order-details', trainTripController.getAllOrderDetails);
router.post('/quarterly-sales', trainTripController.getQuarterlySales);
router.post('/get-weekly-working-hours', trainTripController.getWeeklyWorkingHours);
module.exports = router;