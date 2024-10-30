const pool = require('../models/db');
const bcrypt = require('bcrypt');

exports.getBranchManagerInfo = async (req, res) => {
  try {
    // Get branch_id from request parameters or token
    const branch_id = req.body.branch_id || req.user.branch_id;

    if (!branch_id) {
      return res.status(400).json({
        message: 'Branch ID is required'
      });
    }

    // Call the stored procedure
    const [results] = await pool.query(
      'CALL Get_Branch_Manager_Info(?)',
      [branch_id]
    );

    // Get the first row of the result
    const managerInfo = results[0];

    if (!managerInfo) {
      return res.status(404).json({
        message: 'No manager information found for this branch'
      });
    }

    // Send just the first item from the array since we only need one manager
    res.status(200).json(results[0][0]);

  } catch (error) {
    console.error('Error in getBranchManagerInfo:', error);
    res.status(500).json({
      message: 'Failed to fetch manager information',
      error: error.message
    });
  }
}; 


exports.insertDriver = async (req, res) => {
  try {
    const { 
      driver_id, 
      email, 
      name, 
      contact_number, 
      branch_id, 
      password 
    } = req.body;

    // Validate required fields
    if (!driver_id || !email || !name || !contact_number || !branch_id || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: driver_id, email, name, contact_number, branch_id, password'
      });
    }

    // Validate driver_id format (5 characters)
    if (driver_id.length !== 4) {
      return res.status(400).json({
        success: false,
        message: 'Driver ID must be 5 characters long'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Validate contact number (10 digits)
    if (contact_number.length !== 10 || !/^\d+$/.test(contact_number)) {
      return res.status(400).json({
        success: false,
        message: 'Contact number must be 10 digits'
      });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Call the stored procedure with hashed password
    await pool.query(
      'CALL Insert_Driver(?, ?, ?, ?, ?, ?)',
      [driver_id, email, name, contact_number, branch_id, hashedPassword]
    );

    res.status(201).json({
      success: true,
      message: 'Driver inserted successfully',
      data: {
        driver_id,
        email,
        name,
        contact_number,
        branch_id
      }
    });

  } catch (error) {
    console.error('Error in insertDriver:', error);
    
    // Handle duplicate entry error
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        success: false,
        message: 'Driver ID or email already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to insert driver',
      error: error.message
    });
  }
};

exports.insertAssistant = async (req, res) => {
  try {
    console.log('Received assistant request body:', req.body);
    
    const { 
      assistant_id, 
      email, 
      name, 
      contact_number, 
      branch_id, 
      password 
    } = req.body;

    // Log all received data
    console.log('Parsed assistant data:', {
      assistant_id,
      email,
      name,
      contact_number,
      branch_id,
      passwordLength: password ? password.length : 0
    });

    // Validate required fields
    if (!assistant_id || !email || !name || !contact_number || !branch_id || !password) {
      console.log('Missing required fields:', {
        hasAssistantId: !!assistant_id,
        hasEmail: !!email,
        hasName: !!name,
        hasContactNumber: !!contact_number,
        hasBranchId: !!branch_id,
        hasPassword: !!password
      });
      
      return res.status(400).json({
        success: false,
        message: 'All fields are required: assistant_id, email, name, contact_number, branch_id, password'
      });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Password hashed successfully');

    // Call the stored procedure
    const [result] = await pool.query(
      'CALL Insert_Assistant(?, ?, ?, ?, ?, ?)',
      [assistant_id, email, name, contact_number, branch_id, hashedPassword]
    );

    console.log('Stored procedure result:', result);

    res.status(201).json({
      success: true,
      message: 'Assistant inserted successfully',
      data: {
        assistant_id,
        email,
        name,
        contact_number,
        branch_id
      }
    });

  } catch (error) {
    console.error('Detailed error:', {
      message: error.message,
      code: error.code,
      sqlMessage: error.sqlMessage,
      sqlState: error.sqlState
    });
    
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        success: false,
        message: 'Assistant ID or email already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to insert assistant',
      error: error.message
    });
  }
};