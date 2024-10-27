// src/app.js
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const productRoutes = require('./routes/product');
const customerRoutes = require('./routes/customer');
const orderRoutes = require('./routes/order');
const loginRoutes = require('./routes/login');
const trainTripRoutes = require('./routes/trainTrip');
const truckTripRoutes = require('./routes/truckTrip');
const assistantRoutes = require('./routes/assistant');


// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3001', // Replace with your frontend URL
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes); 
app.use('/api/orders', orderRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/trainTrips', trainTripRoutes);
app.use('/api/truckTrips', truckTripRoutes);
app.use('/api/assistants', assistantRoutes);
// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: 'Internal server error.', error: err });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;
