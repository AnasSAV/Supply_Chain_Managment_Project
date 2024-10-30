const pool = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { email, password, role } = req.body;
    console.log('Login attempt:', { email, role });
    
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

        // Get the correct ID field based on role
        const userId = user[`${role.toLowerCase()}_id`];

        const token = jwt.sign(
            { 
                id: userId,
                email: user.email, 
                role: role.toLowerCase() 
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Prepare response based on role
        const response = {
            token,
            role: role.toLowerCase(),
            id: userId // Include the ID in response
        };

        // Add branch_id to response for specific roles
        if (['manager', 'driver', 'assistant'].includes(role.toLowerCase())) {
            response.branch_id = user.branch_id;
        }

        console.log('Login successful:', { email, role, id: userId });
        res.json(response);
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};
