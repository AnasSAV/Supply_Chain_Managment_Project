// src/controllers/truckTripController.js

const pool = require('../models/db');

exports.getRoutesNotInTruckTripTodayByBranch = async (req, res) => {
  const { branch_id } = req.params;

  // Input Validation
  if (!branch_id) {
    return res.status(400).json({ message: 'branch_id is required.' });
  }

  try {
    const [results] = await pool.query('CALL Get_Routes_Not_In_Truck_Trip_Today_By_Branch(?)', [branch_id]);

    res.status(200).json(results[0]); // results[0] contains the result set
  } catch (error) {
    console.error('Error fetching routes not in truck trip today by branch:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

exports.updateOrderStateTo2 = async (req, res) => {
  // Extract order_id from the request body
  const { order_id } = req.body;

  // Input Validation
  if (!order_id || !Number.isInteger(order_id)) {
    return res.status(400).json({ message: 'Invalid or missing order_id. It should be an integer.' });
  }

  console.log(`Manager updating order state to 2 for Order ID: ${order_id}`);

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Call the stored procedure for the single order_id
    const [results] = await connection.query('CALL Update_Order_State_To_2(?)', [order_id]);

    console.log(`Stored procedure executed successfully for Order ID ${order_id}:`, results);

    await connection.commit();

    res.status(200).json({
      message: 'Order state updated to 2 successfully.'
    });
  } catch (error) {
    await connection.rollback();
    console.error('Error updating order state:', error);

    // Handle custom errors thrown by the stored procedure
    if (error.sqlState === '45000') { // Custom error from SIGNAL
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: 'Server error.', error: error.message });
  } finally {
    connection.release();
  }
};



exports.getLowestWorkedDriversByRoute = async (req, res) => {
  const { branch_id,route_id } = req.body;

  // Input Validation
  if (!branch_id) {
    return res.status(400).json({ message: 'branch_id is required.' });
  }
  if (!route_id) {
    return res.status(400).json({ message: 'route_id is required.' });
  }

  try {
    const [results] = await pool.query('CALL Get_Lowest_Worked_Drivers_By_Route(?,?)', [branch_id,route_id]);

    res.status(200).json(results[0]); // results[0] contains the result set
  } catch (error) {
    console.error('Error fetching lowest worked drivers by route:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};


exports.getLowestWorkedAssistantsByRoute = async (req, res) => {
  const { branch_id,route_id } = req.body;

  // Input Validation
  if (!branch_id) {
    return res.status(400).json({ message: 'branch_id is required.' });
  }
  if (!route_id) {
    return res.status(400).json({ message: 'route_id is required.' });
  }
  try {
    const [results] = await pool.query('CALL Get_Lowest_Worked_Assistants_By_Route(?,?)', [branch_id,route_id]);

    res.status(200).json(results[0]); // results[0] contains the result set
  } catch (error) {
    console.error('Error fetching lowest worked assistants by route:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

exports.getOrdersByRouteAndState2 = async (req, res) => {
  const { route_id } = req.body;

  // Input Validation
  if (!route_id) {
    return res.status(400).json({ message: 'route_id is required.' });
  }

  try {
    const [results] = await pool.query('CALL Get_Order_Details_By_Route_And_State2(?)', [route_id]);

    res.status(200).json(results[0]); // results[0] contains the result set
  } catch (error) {
    console.error('Error fetching orders by route and state 2:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

exports.insertDelivery = async (req, res) => {
  const { truck_trip_id, order_id } = req.body;

  // Input Validation
  if (!truck_trip_id || !Number.isInteger(truck_trip_id)) {
    return res.status(400).json({ message: 'Invalid or missing truck_trip_id. It should be an integer.' });
  }

  if (!order_id || !Number.isInteger(order_id)) {
    return res.status(400).json({ message: 'Invalid or missing order_id. It should be an integer.' });
  }

  console.log(`Inserting delivery for Order ID ${order_id} into Truck Trip ID ${truck_trip_id}`);

  try {
    const [results] = await pool.query('CALL Insert_Delivery(?, ?)', [truck_trip_id, order_id]);

    res.status(200).json({ message: 'Delivery inserted successfully.' });
  } catch (error) {
    console.error('Error inserting delivery:', error);

    // Handle custom errors thrown by the stored procedure
    if (error.sqlState === '45000') { // Custom error from SIGNAL
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

exports.getIncompleteTruckTripsByBranch = async (req, res) => {
  const { branch_id } = req.params;

  // Input Validation
  if (!branch_id) {
    return res.status(400).json({ message: 'branch_id is required.' });
  }

  try {
    const [results] = await pool.query('CALL Get_Truck_Trips_By_Branch_not_complete(?)', [branch_id]);

    res.status(200).json(results[0]); // results[0] contains the result set
  } catch (error) {
    console.error('Error fetching incomplete truck trips by branch:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

exports.addWorkingHoursFromTruckTrip = async (req, res) => {
  const { truck_trip_id } = req.body;

  // Input Validation
  if (!truck_trip_id) {
    return res.status(400).json({ message: 'truck_trip_id is required.' });
  }

  try {
    const [results] = await pool.query('CALL Add_Working_Hours_From_Truck_Trip(?)', [truck_trip_id]);

    res.status(200).json({ message: 'Working hours added from truck trip successfully.' });
  } catch (error) {
    console.error('Error adding working hours from truck trip:', error);

    // Handle custom errors
    if (error.sqlState === '45000') { // Custom error from SIGNAL
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

exports.addTruckTrip = async (req, res) => {
  // Extract the truck trip details from the request body
  const { truck_id, assistant_id, driver_id, route_id } = req.body;

  // Input Validation
  if (!truck_id || typeof truck_id !== 'string') {
    return res.status(400).json({ message: 'Invalid or missing truck_id. It should be a string.' });
  }

  if (!assistant_id || typeof assistant_id !== 'string') {
    return res.status(400).json({ message: 'Invalid or missing assistant_id. It should be a string.' });
  }

  if (!driver_id || typeof driver_id !== 'string') {
    return res.status(400).json({ message: 'Invalid or missing driver_id. It should be a string.' });
  }

  if (!route_id || typeof route_id !== 'string') {
    return res.status(400).json({ message: 'Invalid or missing route_id. It should be a string.' });
  }

  console.log(`Adding Truck Trip: Truck ID ${truck_id}, Assistant ID ${assistant_id}, Driver ID ${driver_id}, Route ID ${route_id}`);

  try {
    // Call the stored procedure
    const [results] = await pool.query('CALL Add_Truck_Trip(?, ?, ?, ?)', [
      truck_id, assistant_id, driver_id, route_id,
    ]);

    res.status(201).json({ message: 'Truck trip added successfully.' });
  } catch (error) {
    console.error('Error adding truck trip:', error);

    // Handle custom errors thrown by the stored procedure
    if (error.sqlState === '45000') { // Custom error from SIGNAL
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

exports.getRoutesByBranch = async (req, res) => {
  const { branch_id } = req.body;

  // Input Validation
  if (!branch_id) {
    return res.status(400).json({ message: 'branch_id is required.' });
  }

  try {
    const [results] = await pool.query('CALL Get_Routes_By_Branch(?)', [branch_id]);
    
    // Since the stored procedure returns a result set, we send the first element
    res.status(200).json(results[0]);
  } catch (error) {
    console.error('Error fetching routes by branch:', error);

    // Handle custom errors
    if (error.sqlState === '45000') { // Custom error from SIGNAL
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

exports.getConfirmedOrdersByBranch = async (req, res) => {
  const { branch_id } = req.body;

  // Input Validation
  if (!branch_id) {
    return res.status(400).json({ message: 'branch_id is required.' });
  }

  try {
    const [results] = await pool.query('CALL Get_Confirmed_Orders_By_Branch(?)', [branch_id]);
    
    res.status(200).json(results[0]); // results[0] contains the result set
  } catch (error) {
    console.error('Error fetching confirmed orders by branch:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

exports.getTrucksByBranch = async (req, res) => {
  const { branch_id } = req.body;

  // Input Validation
  if (!branch_id) {
    return res.status(400).json({ message: 'branch_id is required.' });
  }

  try {
    const [results] = await pool.query('CALL Get_Trucks_By_Branch(?)', [branch_id]);
    
    // Since the stored procedure returns a result set, we send the first element
    res.status(200).json(results[0]);
  } catch (error) {
    console.error('Error fetching trucks by branch:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

exports.getTruckTripsByBranchNotComplete = async (req, res) => {
  const { branch_id } = req.body;

  // Input Validation
  if (!branch_id) {
    return res.status(400).json({ message: 'branch_id is required.' });
  }

  try {
    const [results] = await pool.query('CALL Get_Today_And_Future_Truck_Trips_By_Branch(?)', [branch_id]);
    
    // Since the stored procedure returns a result set, we send the first element
    res.status(200).json(results[0]);
  } catch (error) {
    console.error('Error fetching incomplete truck trips:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

exports.getOrdersToBeDistributedByBranch = async (req, res) => {
  const { branch_id } = req.body;

  // Input Validation
  if (!branch_id) {
    return res.status(400).json({ message: 'branch_id is required.' });
  }

  try {
    const [results] = await pool.query('CALL Get_Orders_to_be_distributed_By_Branch(?)', [branch_id]);
    
    // Since the stored procedure returns a result set, we send the first element
    res.status(200).json(results[0]);
  } catch (error) {
    console.error('Error fetching orders to be distributed:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

