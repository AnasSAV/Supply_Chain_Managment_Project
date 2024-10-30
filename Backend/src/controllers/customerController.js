// src/controllers/customerController.js
const pool = require('../models/db');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const { email, password, name, contact_number, delivery_address } = req.body;

  try {
    // Check if the email already exists
    const [existingCustomers] = await pool.query('SELECT * FROM customer WHERE email = ?', [email]);

    if (existingCustomers.length > 0) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new customer
    await pool.query(
      'INSERT INTO customer (email, password, name, contact_number, delivery_address) VALUES (?, ?, ?, ?, ?)',
      [email, hashedPassword, name, contact_number, delivery_address]
    );

    res.status(201).json({ message: 'Customer registered successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error });
  }
};

exports.getOrderDetails = async (req, res) => {
    try {
        const { customer_id } = req.body;

        // Input validation
        if (!customer_id) {
            return res.status(400).json({ message: 'Customer ID is required' });
        }

        const [results] = await pool.query(
            'CALL Get_Order_Details_By_Customer(?)',
            [customer_id]
        );

        res.json({
            success: true,
            orders: results[0]
        });

    } catch (error) {
        console.error('Error getting customer order details:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error retrieving order details',
            error: error.message 
        });
    }
};


