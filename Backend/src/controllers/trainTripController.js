// src/controllers/trainTripController.js
const pool = require('../models/db');

exports.createTrainTrip = async (req, res) => {
  // Check if the request body is valid JSON
  if (!req.is('application/json')) {
    return res.status(400).json({ message: 'Invalid content type. Expected application/json.' });
  }

  const { train_id, date } = req.body;

  // Input Validation
  if (!train_id || typeof train_id !== 'string') {
    return res.status(400).json({ message: 'Invalid or missing train_id. It should be a string.' });
  }

  if (!date || isNaN(Date.parse(date))) {
    return res.status(400).json({ message: 'Invalid or missing date. It should be in YYYY-MM-DD format.' });
  }

  console.log(`Creating Train Trip: Train ID ${train_id} on Date ${date}`);

  try {
    // Call the stored procedure
    const [results] = await pool.query('CALL Insert_Train_Trip_By_Train(?, ?)', [train_id, date]);

    console.log('Stored procedure executed successfully:', results);

    res.status(201).json({
      message: 'Train trip created successfully.'
    });
  } catch (error) {
    console.error('Error creating train trip:', error);

    // Handle custom errors thrown by the stored procedure
    if (error.sqlState === '45000') { // Custom error from SIGNAL
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

exports.getTrainTripsByDateAndBranch = async (req, res) => {
  // Check if the request body is valid JSON
  if (!req.is('application/json')) {
    return res.status(400).json({ message: 'Invalid content type. Expected application/json.' });
  }

  const { date, branch_id } = req.body;
  console.log(`Fetching Train Trips: Branch ID ${branch_id} on Date ${date}`);

  try {
    // Call the stored procedure
    const [results] = await pool.query('CALL Get_Train_Trips_By_Date_And_Branch(?, ?)', [date, branch_id]);

    console.log('Stored procedure executed successfully');

    // The first element of the results array contains the actual data
    const trainTrips = results[0];

    if (trainTrips.length === 0) {
      return res.status(404).json({ message: 'No train trips found for the given date and branch.' });
    }

    // Transform the data to match the expected format
    const formattedTrips = trainTrips.map(trip => ({
      id: trip.train_trip_id,
      name: trip.train_id,
      date: new Date(trip.date).toISOString().split('T')[0], // Format date as YYYY-MM-DD
      branch: trip.branch_id,
      capacity: trip.cur_capacity
    }));

    res.status(200).json(formattedTrips);
  } catch (error) {
    console.error('Error fetching train trips:', error);

    // Handle custom errors thrown by the stored procedure
    if (error.sqlState === '45000') { // Custom error from SIGNAL
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const [orders] = await pool.query('SELECT * FROM order_product');

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error });
  }
};

exports.getPendingOrders = async (req, res) => {
  const { branch_id } = req.params;

  try {
    const [orders] = await pool.query('CALL get_customers_state_0(?)', [branch_id]);
    
    res.json(orders[0]);
  } catch (error) {
    console.error('Error fetching pending orders:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// Controller to assign selected orders to a train trip
exports.assignOrders = async (req, res) => {
  const { order_ids, train_trip_id } = req.body;

  // Input Validation
  if (!order_ids || !Array.isArray(order_ids) || order_ids.length === 0) {
    return res.status(400).json({ message: 'Invalid or missing order_ids. It should be a non-empty array.' });
  }

  if (!train_trip_id || isNaN(train_trip_id)) {
    return res.status(400).json({ message: 'Invalid or missing train_trip_id. It should be a number.' });
  }

  console.log(`Assigning Orders: ${order_ids.join(', ')} to Train Trip ID: ${train_trip_id}`);

  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // Fetch the branch_id of the train trip
    const [trainTrip] = await connection.query('SELECT branch_id FROM train_trip WHERE train_trip_id = ?', [train_trip_id]);
    if (trainTrip.length === 0) {
      throw new Error('Train trip not found.');
    }
    const trainBranchId = trainTrip[0].branch_id;

    for (const order_id of order_ids) {
      // Fetch the branch_id of the order
      const [order] = await connection.query('SELECT branch_id FROM order_product WHERE order_id = ?', [order_id]);
      if (order.length === 0) {
        throw new Error(`Order with ID ${order_id} not found.`);
      }
      const orderBranchId = order[0].branch_id;

      // Check if the branch_id of the order matches the branch_id of the train trip
      if (orderBranchId !== trainBranchId) {
        throw new Error(`Order with ID ${order_id} does not belong to the same branch as the train trip.`);
      }

      // Call the stored procedure for each order
      await connection.query('CALL Add_Order_To_Train_If_Capacity(?, ?)', [order_id, train_trip_id]);
    }

    await connection.commit();

    res.json({ message: 'Selected orders have been successfully assigned to the train trip.' });
  } catch (error) {
    if (connection) await connection.rollback();
    console.error('Error assigning orders to train trip:', error);

    // Relay specific SQL error messages to the client
    if (error.sqlState && error.sqlState.startsWith('45')) {
      res.status(400).json({ message: error.sqlMessage });
    } else {
      res.status(500).json({ message: 'Server error.', error: error.message });
    }
  } finally {
    if (connection) connection.release();
  }
};
