const pool = require('../models/db');

exports.getTripDetailsByDriver = async (req, res) => {
    try {
        const { driver_id } = req.body;
        console.log('Fetching trip details for driver:', driver_id);

        if (!driver_id) {
            return res.status(400).json({ message: 'Driver ID is required' });
        }

        const [results] = await pool.query(
            'CALL Get_Trip_Details_By_Driver(?)',
            [driver_id]
        );

        console.log('Trip details found:', results[0]);
        res.json(results[0]);
    } catch (error) {
        console.error('Error getting driver trip details:', error);
        res.status(500).json({ 
            message: 'Error retrieving trip details',
            error: error.message 
        });
    }
}; 