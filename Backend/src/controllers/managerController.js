const pool = require('../models/db');

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