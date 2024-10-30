const express = require('express');
const router = express.Router();
const assistantController = require('../controllers/assistantController');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware.verifyToken);
router.use(authMiddleware.requireRole('assistant'));

router.get('/get-assistant-orders', assistantController.getAssistantOrderDetailsByTruckTrip);
router.post('/mark-order-as-delivered', assistantController.markOrderAsDelivered);
router.post('/get-assistant-order-details-by-truck-trip', assistantController.getOrderDetailsByTruckTrip);
router.post('/get-assistant-completed-trip-details', assistantController.getCompletedTripDetails);
router.post('/mark-order-as-returned', assistantController.markOrderAsReturned);
router.post('/get-assistant-left-working-hours', assistantController.getLeftWorkingHours);
module.exports = router;
