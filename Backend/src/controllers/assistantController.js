// src/controllers/assistantController.js
const pool = require('../models/db');

exports.getAssistantOrderDetailsByTruckTrip = async (req, res) => {
    const assistant_id = req.user.id; // Assuming assistant ID is stored in req.user.id
  
    // Input Validation
    if (!assistant_id) {
      return res.status(400).json({ message: 'Assistant ID is missing.' });
    }
  
    try {
      const [results] = await pool.query('CALL Get_Assistant_Order_Details_By_Truck_Trip(?)', [assistant_id]);
  
      res.status(200).json(results[0]); // results[0] contains the result set
    } catch (error) {
      console.error('Error fetching assistant order details by truck trip:', error);
  
      // Handle custom errors
      if (error.sqlState === '45000') { // Custom error from SIGNAL
        return res.status(400).json({ message: error.message });
      }
  
      res.status(500).json({ message: 'Server error.', error: error.message });
    }
  };

exports.markOrderAsDelivered = async (req, res) => {
    const { order_id } = req.body;
  
    // Input Validation
    if (!order_id || !Number.isInteger(order_id)) {
      return res.status(400).json({ message: 'Invalid or missing order_id. It should be an integer.' });
    }
  
    try {
      const [results] = await pool.query('CALL Update_Order3_4_And_Delivery_Status0_1_Delivered(?)', [order_id]);
  
      res.status(200).json({ message: 'Order marked as delivered successfully.' });
    } catch (error) {
      console.error('Error marking order as delivered:', error);
  
      // Handle custom errors
      if (error.sqlState === '45000') { // Custom error from SIGNAL
        return res.status(400).json({ message: error.message });
      }
  
      res.status(500).json({ message: 'Server error.', error: error.message });
    }
  };
  
exports.markOrderAsReturned = async (req, res) => {
    const { order_id } = req.body;
  
    // Input Validation
    if (!order_id || !Number.isInteger(order_id)) {
      return res.status(400).json({ message: 'Invalid or missing order_id. It should be an integer.' });
    }
  
    try {
      const [results] = await pool.query('CALL Update_Order3_5_And_Delivery_Status0_2_Returned(?)', [order_id]);
  
      res.status(200).json({ message: 'Order marked as returned successfully.' });
    } catch (error) {
      console.error('Error marking order as returned:', error);
  
      // Handle custom errors
      if (error.sqlState === '45000') { // Custom error from SIGNAL
        return res.status(400).json({ message: error.message });
      }
  
      res.status(500).json({ message: 'Server error.', error: error.message });
    }
  };
  