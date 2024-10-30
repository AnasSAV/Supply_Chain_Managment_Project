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

exports.getLeftWorkingHours = async (req, res) => {
    try {
        const { driver_id } = req.body;

        // Input validation
        if (!driver_id) {
            return res.status(400).json({ message: 'Driver ID is required' });
        }

        // Call the MySQL function
        const [results] = await pool.query(
            'SELECT Get_Left_Working_Hours_Driver(?) AS leftHours',
            [driver_id]
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
        console.error('Error getting driver left working hours:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error retrieving working hours',
            error: error.message 
        });
    }
}; 