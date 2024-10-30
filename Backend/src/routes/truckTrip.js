// src/routes/truckTrip.js

const express = require('express');
const router = express.Router();
const truckTripController = require('../controllers/truckTripController');
const authMiddleware = require('../middlewares/auth');
const managerController = require('../controllers/managerController');

router.use(authMiddleware.verifyToken);
router.use(authMiddleware.requireRole('manager'));

router.post('/routes-not-in-truck-trip', truckTripController.getRoutesNotInTruckTripTodayByBranch);
router.post('/lowest-worked-drivers-by-route', truckTripController.getLowestWorkedDriversByRoute);
router.post('/lowest-worked-assistants-by-route', truckTripController.getLowestWorkedAssistantsByRoute);
router.post('/get-orders-by-route-and-state', truckTripController.getOrdersByRouteAndState2);
router.post('/update-state', truckTripController.updateOrderStateTo2);
router.post('/insert-delivery', truckTripController.insertDelivery);
router.post('/get-incomplete-truck-trips-by-branch', truckTripController.getIncompleteTruckTripsByBranch);
router.post('/add-working-hours-from-truck-trip', truckTripController.addWorkingHoursFromTruckTrip);
router.post('/add-truck-trip', truckTripController.addTruckTrip);
router.post('/get-routes-by-branch', truckTripController.getRoutesByBranch);
router.post('/get-confirmed-orders-by-branch', truckTripController.getConfirmedOrdersByBranch);
router.post('/get-trucks-by-branch', truckTripController.getTrucksByBranch);
router.post('/get-truck-trips-by-branch-not-complete', truckTripController.getTruckTripsByBranchNotComplete);
router.post('/get-orders-to-be-distributed-by-branch', truckTripController.getOrdersToBeDistributedByBranch);
router.post('/get-branch-manager-info', managerController.getBranchManagerInfo);
router.post('/insert-driver', managerController.insertDriver);
router.post('/insert-assistant', managerController.insertAssistant);

module.exports = router;
