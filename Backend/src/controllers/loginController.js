const pool = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { email, password, role } = req.body;
    console.log('Login attempt:', { email, role }); // Log login attempt
    if (!email || !password || !role) {
      return res.status(400).json({ message: 'Email, password, and role are required.' });
    }
    
    if (!['admin', 'customer', 'driver', 'manager', 'assistant'].includes(role.toLowerCase())) {
        return res.status(400).json({ message: 'Invalid role provided.' });
    }

    try {
        const [users] = await pool.query(`SELECT * FROM ${role.toLowerCase()} WHERE email = ?`, [email]);

        if (users.length === 0) {
            return res.status(401).json({ message: `Authentication failed. ${role} not found.` });
        }

        const user = users[0];

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
        }

        const token = jwt.sign(
            { id: user[`${role.toLowerCase()}_id`], email: user.email, role: role.toLowerCase() },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        console.log('Login successful:', { email, role }); // Log successful login
        res.json({ token, role: role.toLowerCase() });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};
