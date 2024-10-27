// src/controllers/productController.js
const pool = require('../models/db');

exports.getAllProducts = async (req, res) => {
  try {
    const [products] = await pool.query('SELECT * FROM product');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error });
  }
};

exports.getProductById = async (req, res) => {
  const { product_id } = req.params;

  try {
    const [products] = await pool.query('SELECT * FROM product WHERE product_id = ?', [product_id]);

    if (products.length === 0) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.json(products[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error });
  }
};

exports.createProduct = async (req, res) => {
  const { product_id, product_name, price, quantity, capacity, description } = req.body;

  try {
    await pool.query(
      'INSERT INTO product (product_id, product_name, price, quantity, capacity, description) VALUES (?, ?, ?, ?, ?, ?)',
      [product_id, product_name, price, quantity, capacity, description]
    );
    res.status(201).json({ message: 'Product created successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error });
  }
};

exports.updateProduct = async (req, res) => {
  const { product_id } = req.params;
  const { product_name, price, quantity, capacity, description } = req.body;

  try {
    await pool.query(
      'UPDATE product SET product_name = ?, price = ?, quantity = ?, capacity = ?, description = ? WHERE product_id = ?',
      [product_name, price, quantity, capacity, description, product_id]
    );
    res.json({ message: 'Product updated successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error });
  }
};

exports.deleteProduct = async (req, res) => {
  const { product_id } = req.params;

  try {
    await pool.query('DELETE FROM product WHERE product_id = ?', [product_id]);
    res.json({ message: 'Product deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error });
  }
};
