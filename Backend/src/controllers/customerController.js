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


