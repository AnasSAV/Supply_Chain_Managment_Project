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
exports.assignOrder = async (req, res) => {
  const { order_id, train_trip_id } = req.body;

  // Input Validation
  if (!order_id || isNaN(order_id)) {
    return res.status(400).json({ message: 'Invalid or missing order_id. It should be a number.' });
  }

  if (!train_trip_id || isNaN(train_trip_id)) {
    return res.status(400).json({ message: 'Invalid or missing train_trip_id. It should be a number.' });
  }

  console.log(`Assigning Order ID: ${order_id} to Train Trip ID: ${train_trip_id}`);

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

    // Call the stored procedure for the order
    await connection.query('CALL Add_Order_To_Train_If_Capacity(?, ?)', [order_id, train_trip_id]);

    await connection.commit();

    res.json({ message: 'Order has been successfully assigned to the train trip.' });
  } catch (error) {
    if (connection) await connection.rollback();
    console.error('Error assigning order to train trip:', error);

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


exports.getOrdersByTrainAndDate = async (req, res) => {
  try {
    console.log('Received request with body:', req.body);
    const { train_id, date } = req.body;

    if (!train_id || !date) {
      return res.status(400).json({ message: 'Train ID and date are required' });
    }

    const [results] = await pool.query(
      'CALL Get_Orders_By_Train_And_Date(?, ?)',
      [train_id, date]
    );

    console.log('Database results:', results);
    
    // First element contains our order IDs
    const orders = results[0];
    console.log('Sending orders:', orders);
    
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error in getOrdersByTrainAndDate:', error);
    res.status(500).json({ 
      message: 'Failed to fetch orders',
      error: error.message 
    });
  }
};

exports.getFutureTrainTrips = async (req, res) => {
  try {
    const [results] = await pool.query('CALL Get_Future_Train_Trips()');
    
    // MySQL returns stored procedure results as an array where the first element contains our data
    const trainTrips = results[0];
    
    res.status(200).json(trainTrips);
  } catch (error) {
    console.error('Error fetching future train trips:', error);
    res.status(500).json({ message: 'Failed to fetch future train trips' });
  }
};

exports.getBranchOrderCounts = async (req, res) => {
  try {
      const [results] = await pool.query(
          'CALL Get_Current_Month_Order_Count_By_Branch_Name()'
      );

      res.json({
          success: true,
          branchCounts: results[0]
      });

  } catch (error) {
      console.error('Error getting branch order counts:', error);
      res.status(500).json({ 
          success: false,
          message: 'Error retrieving branch statistics',
          error: error.message 
      });
  }
};

exports.getQuarterlySales = async (req, res) => {
    try {
        const year = req.body.year;
        
        const [results] = await pool.query(
            'CALL Get_Quarterly_Sales_Report(?)',
            [year]
        );

        res.json({
            success: true,
            data: results[0]
        });

    } catch (error) {
        console.error('Error getting quarterly sales:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error retrieving quarterly sales data',
            error: error.message 
        });
    }
};

exports.getWeeklyWorkingHours = async (req, res) => {
  try {
      const [results] = await pool.query(
          'CALL Get_Weekly_Working_Hours_Assistants()'
      );

      const formattedData = results[0].map(item => ({
          name: item.assistant_name,
          hours: item.total_worked_hours
      }));

      res.json({
          success: true,
          data: formattedData
      });

  } catch (error) {
      console.error('Error getting weekly working hours:', error);
      res.status(500).json({ 
          success: false,
          message: 'Error retrieving working hours data',
          error: error.message 
      });
  }
};

exports.getAllOrderDetails = async (req, res) => {
    try {
        const [results] = await pool.query(`
            SELECT 
                op.order_id AS Order_ID,
                c.name AS Customer,
                op.total_price AS Total,
                op.state AS Status
            FROM Order_Product op
            JOIN Customer c ON op.customer_id = c.customer_id
            ORDER BY op.order_id DESC;
        `);

        // Format the results to include status mapping
        const formattedOrders = results.map(order => ({
            ...order,
            Status: (() => {
                switch (order.Status) {
                    case 0:
                        return 'Pending';
                    case 4:
                    case 5:
                        return 'Delivered';
                    default:
                        return 'Shipped';
                }
            })()
        }));

        res.json({
            success: true,
            orders: formattedOrders
        });
    } catch (error) {
        console.error('Error getting order details:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error retrieving order details',
            error: error.message 
        });
    }
};