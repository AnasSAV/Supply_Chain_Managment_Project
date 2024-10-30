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
  
    // Enhanced Input Validation
    if (!order_id) {
        return res.status(400).json({ message: 'Order ID is required' });
    }

    // Ensure order_id is an integer
    const orderIdInt = parseInt(order_id, 10);
    if (isNaN(orderIdInt)) {
        return res.status(400).json({ message: 'Invalid order ID format' });
    }
  
    try {
        console.log('Marking order as returned:', orderIdInt); // Debug log

        const [results] = await pool.query(
            'CALL Update_Order3_5_And_Delivery_Status0_2_Returned(?)', 
            [orderIdInt]
        );
  
        console.log('Procedure results:', results); // Debug log

        return res.status(200).json({ 
            success: true,
            message: 'Order marked as returned successfully' 
        });
    } catch (error) {
        console.error('Error marking order as returned:', error);
  
        // Handle specific errors
        if (error.sqlState === '45000') {
            return res.status(400).json({ 
                success: false,
                message: error.message 
            });
        }
  
        return res.status(500).json({ 
            success: false,
            message: 'Server error while marking order as returned',
            error: error.message 
        });
    }
  };
  
exports.getOrderDetailsByTruckTrip = async (req, res) => {
  try {
      const { assistant_id } = req.body;

      if (!assistant_id) {
          return res.status(400).json({ message: 'Assistant ID is required' });
      }

      const [results] = await pool.query(
          'CALL Get_Assistant_Order_Details_By_Truck_Trip(?)',
          [assistant_id]
      );

      // The first element contains the order details
      const orderDetails = results[0];

      res.json(orderDetails);
  } catch (error) {
      console.error('Error getting assistant order details:', error);
      res.status(500).json({ 
          message: 'Error retrieving order details',
          error: error.message 
      });
  }
};

exports.getCompletedTripDetails = async (req, res) => {
  try {
      const { assistant_id } = req.body;
      console.log('Fetching completed trip details for assistant:', assistant_id);

      if (!assistant_id) {
          return res.status(400).json({ message: 'Assistant ID is required' });
      }

      const [results] = await pool.query(
          'CALL Get_Completed_Trip_Details_By_Assistant(?)',
          [assistant_id]
      );

      console.log('Trip details found:', results[0]);
      res.json(results[0]);
  } catch (error) {
      console.error('Error getting assistant completed trip details:', error);
      res.status(500).json({ 
          message: 'Error retrieving trip details',
          error: error.message 
      });
  }
};

exports.getLeftWorkingHours = async (req, res) => {
    try {
        const { assistant_id } = req.body;

        // Input validation
        if (!assistant_id) {
            return res.status(400).json({ message: 'Assistant ID is required' });
        }

        // Call the MySQL function
        const [results] = await pool.query(
            'SELECT Get_Left_Working_Hours_Assistant(?) AS leftHours',
            [assistant_id]
        );

        // Format the time from the result
        const leftHours = results[0].leftHours;
        
        // Convert MySQL TIME to readable format (HH:MM:SS)
        const formattedTime = leftHours ? leftHours.slice(0, 8) : '00:00:00';

        res.json({ 
            success: true,
            leftHours: formattedTime
        });

    } catch (error) {
        console.error('Error getting assistant left working hours:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error retrieving working hours',
            error: error.message 
        });
    }
};

