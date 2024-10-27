// src/controllers/orderController.js
const pool = require('../models/db');

exports.placeOrder = async (req, res) => {
  const {
    quantity,
    total_price,
    total_capacity,
    delivery_type,
    product_id,
    route_id,
    branch_id,
    delivery_date
  } = req.body;

  const customer_id = req.customer_id; // Extracted from the token by authentication middleware

  try {
    // Validate that the delivery date is at least 7 days in the future
    const currentDate = new Date();
    const minDate = new Date();
    minDate.setDate(currentDate.getDate() + 7);

    const deliveryDate = new Date(delivery_date);

    if (deliveryDate < minDate) {
      return res.status(400).json({ message: 'Delivery date must be at least 7 days from today.' });
    }

    // Call the stored procedure
    await pool.query('CALL add_order_product(?, ?, ?, ?, ?, ?, ?, ?)', [
      quantity,
      total_price,
      total_capacity,
      delivery_type,
      customer_id,
      product_id,
      route_id,
      branch_id
    ]);

    res.status(201).json({ message: 'Order placed successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error });
  }
};

exports.getCustomerOrders = async (req, res) => {
    const customer_id = req.customer_id;
  
    try {
      const [orders] = await pool.query('SELECT * FROM order_product WHERE customer_id = ?', [customer_id]);
  
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Server error.', error });
    }
  };
  
