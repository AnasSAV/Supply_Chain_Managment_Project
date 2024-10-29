import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';

// Modal Component for confirmation
const Modal = ({ isOpen, onClose, title, message, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-10">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            className="mr-2 bg-red-600 text-white py-2 px-4 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};




const AssignmentPage = () => {
  const [orders, setOrders] = useState([]);
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('createTrip');
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [truckTrips, setTruckTrips] = useState([]);  // Store created truck trips
  const [selectedTruckTrip, setSelectedTruckTrip] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedDriver, setSelectedDriver] = useState('');
  const [selectedAssistant, setSelectedAssistant] = useState('');
  const [selectedTruck, setSelectedTruck] = useState('');
  const [orderArrival, setOrderArrival] = useState(''); // New for Order Arrival
  const [routes, setRoutes] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [assistants, setAssistants] = useState([]);
  const [trucks, setTrucks] = useState([]);
  const { user } = useContext(AuthContext);

  // Modify the fetchRoutes function to store both id and name
  const fetchRoutes = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/truckTrips/get-routes-by-branch',
        {
          branch_id: user.branch_id
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      // Store the complete route objects
      setRoutes(response.data);
    } catch (error) {
      console.error('Error fetching routes:', error);
    }
  };

  // Use fetchRoutes in useEffect for initial load
  useEffect(() => {
    if (user.branch_id) {
      fetchRoutes();
    }
  }, [user.branch_id]);

  const handleCompleteTrip = (tripId) => {
    setTruckTrips((prevTrips) =>
      prevTrips.map((trip) =>
        trip.id === tripId ? { ...trip, completed: true } : trip
      )
    );
  };

  // Handle confirming an order
  const handleConfirmOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, confirmed: !order.confirmed } : order
      )
    );
  };

  // Handle selecting an order for assignment
  const handleSelectOrder = (orderId) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  // Handle truck trip creation
  const handleCreateTruckTrip = async () => {
    if (!selectedRoute || !selectedDriver || !selectedAssistant || !selectedTruck) {
      alert('Please select Route, Driver, Assistant, and Truck');
      return;
    }

    try {
      // Find the route object to get route_id
      const selectedRouteObj = routes.find(route => route.route_name === selectedRoute);
      
      // Get the selected driver and assistant objects
      const selectedDriverObj = drivers.find(driver => driver.driver_id === selectedDriver);
      const selectedAssistantObj = assistants.find(assistant => assistant.assistant_id === selectedAssistant);
      
      const response = await axios.post(
        'http://localhost:3000/api/truckTrips/add-truck-trip',
        {
          route_id: selectedRouteObj.route_id,
          driver_id: selectedDriverObj.driver_id,
          assistant_id: selectedAssistantObj.assistant_id,
          truck_id: selectedTruck,
          branch_id: user.branch_id
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.data) {
        // Add the new truck trip to the local state
        const newTruckTrip = {
          id: response.data.truck_trip_id,
          route: selectedRoute,
          driver: selectedDriverObj.name,  // Use name for display
          assistant: selectedAssistantObj.name,  // Use name for display
          truck: selectedTruck,
          orders: [],
          completed: false
        };

        setTruckTrips([...truckTrips, newTruckTrip]);
        clearSelections();
        alert('Truck trip created successfully!');
      }
    } catch (error) {
      console.error('Error creating truck trip:', error);
      alert('Failed to create truck trip. Please try again.');
    }
  };

  const clearSelections = () => {
    setSelectedRoute('');
    setSelectedDriver('');
    setSelectedAssistant('');
    setSelectedTruck('');
    setOrderArrival(''); // Clear order arrival field
    setSelectedOrders([]);
  };

  // Confirm order assignment modal
  const handleAssignOrdersToTruck = () => {
    if (selectedOrders.length === 0) {
      alert('Please select at least one confirmed order.');
      return;
    }
    if (!selectedTruckTrip) {
      alert('Please select a truck trip to assign orders.');
      return;
    }
    setIsModalOpen(true); // Open confirmation modal
  };

  const confirmOrderAssignment = () => {
    setTruckTrips((prevTrips) =>
      prevTrips.map((trip) =>
        trip.id === selectedTruckTrip
          ? {
            ...trip,
            orders: [...trip.orders, ...selectedOrders.map((orderId) =>
              orders.find((order) => order.id === orderId)
            )]
          }
          : trip
      )
    );
    setOrders((prevOrders) =>
      prevOrders.filter((order) => !selectedOrders.includes(order.id))
    );
    setSelectedOrders([]);
    setIsModalOpen(false); // Close modal
    alert('Orders assigned to the selected truck trip successfully!');
  };

  // Fetch initial orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post(
          'http://localhost:3000/api/truckTrips/get-confirmed-orders-by-branch',
          {
            branch_id: user.branch_id
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );

        setOrders(response.data.map(order => ({
          ...order,
          confirmed: false
        })));
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if (user.branch_id) {
      fetchOrders();
    }
  }, [user.branch_id]);

  // Handle order confirmation
  const handleOrderConfirm = async (orderId) => {
    try {
      // Update local state
      setOrders(orders.map(order =>
        order.order_id === orderId
          ? { ...order, confirmed: true }
          : order
      ));

      // Fetch route details for confirmed order
      const response = await axios.post(
        'http://localhost:3000/api/truckTrips/update-state',
        {
          order_id: orderId,
          branch_id: user.branch_id
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      // Just add the single response to confirmed orders
      setConfirmedOrders(prev => [...prev, response.data]);
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };

  // Fetch drivers for selected route
  const fetchDrivers = async (selectedRoute) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/truckTrips/lowest-worked-drivers-by-route',
        {
          branch_id: user.branch_id,
          route_id: selectedRoute
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      console.log('Drivers response:', response.data);
      setDrivers(response.data);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  // Fetch assistants for selected route
  const fetchAssistants = async (selectedRoute) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/truckTrips/lowest-worked-assistants-by-route',
        {
          branch_id: user.branch_id,
          route_id: selectedRoute
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      console.log('Assistants response:', response.data);
      setAssistants(response.data);
    } catch (error) {
      console.error('Error fetching assistants:', error);
    }
  };

  // Update the route selection handler
  const handleRouteChange = (e) => {
    const selectedRouteName = e.target.value;
    // Find the corresponding route object from routes array
    const selectedRouteObj = routes.find(route => route.route_name === selectedRouteName);

    setSelectedRoute(selectedRouteName);

    if (selectedRouteObj) {
      fetchDrivers(selectedRouteObj.route_id);
      fetchAssistants(selectedRouteObj.route_id);
    }
  };

  // Add fetch trucks function
  const fetchTrucks = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/truckTrips/get-trucks-by-branch',
        {
          branch_id: user.branch_id
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      console.log('Trucks response:', response.data); // Debug log
      setTrucks(response.data);
    } catch (error) {
      console.error('Error fetching trucks:', error);
    }
  };

  // Add useEffect to fetch trucks when component mounts
  useEffect(() => {
    if (user.branch_id) {
      fetchTrucks();
    }
  }, [user.branch_id]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col">
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirm Assignment"
        message="Are you sure you want to assign the selected orders to the truck trip?"
        onConfirm={confirmOrderAssignment}
      />

      {/* Tab Navigation */}
      <div className="flex justify-center mb-6 space-x-4">
        <button
          onClick={() => setActiveTab('orderArrival')}
          className={`px-4 py-2 rounded-lg ${activeTab === 'orderArrival' ? 'bg-purple-600 text-white' : 'bg-white text-purple-600 border border-purple-600'
            } transition duration-300`}
        >
          Order Arrival
        </button>
        <button
          onClick={() => setActiveTab('createTrip')}
          className={`px-4 py-2 rounded-lg ${activeTab === 'createTrip' ? 'bg-purple-600 text-white' : 'bg-white text-purple-600 border border-purple-600'
            } transition duration-300`}
        >
          Create Truck Trip
        </button>
        <button
          onClick={() => setActiveTab('manageOrders')}
          className={`px-4 py-2 rounded-lg ${activeTab === 'manageOrders' ? 'bg-purple-600 text-white' : 'bg-white text-purple-600 border border-purple-600'
            } transition duration-300`}
        >
          Manage Orders
        </button>
      </div>

      {/* Order Arrival Tab */}
      {activeTab === 'orderArrival' && (
        <div>
          <h2 className="text-3xl font-bold mb-4 text-purple-800">Order Arrival</h2>
          <p className="text-gray-600 mb-4">
            Review and confirm orders received for assignment.
          </p>
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.order_id}
                className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <span className="text-gray-800">Order ID: {order.order_id}</span>
                <button
                  onClick={() => handleOrderConfirm(order.order_id)}
                  className={`px-4 py-1 rounded-lg ${order.confirmed ? 'bg-gray-400' : 'bg-blue-600'
                    } text-white hover:bg-blue-700 transition-colors`}
                  disabled={order.confirmed}
                >
                  {order.confirmed ? 'Confirmed' : 'Confirm'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Truck Trip Tab */}
      {activeTab === 'createTrip' && (
        <div>
          <h2 className="text-3xl font-bold mb-4 text-purple-800">Create Truck Trip</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            {/* Route Selection */}
            <div className="relative">
              <select
                value={selectedRoute}
                onChange={handleRouteChange}
                onClick={() => fetchRoutes()}
                className="block w-full border border-gray-300 rounded-lg p-3 pr-8 text-gray-700 focus:outline-none focus:ring focus:ring-purple-500"
              >
                <option value="">Select Route</option>
                {routes.map((route) => (
                  <option key={route.route_id} value={route.route_name}>
                    {route.route_name}
                  </option>
                ))}
              </select>
            </div>
            {/* Driver Selection */}
            <div className="relative">
              <select
                value={selectedDriver}
                onChange={(e) => setSelectedDriver(e.target.value)}
                className="block w-full border border-gray-300 rounded-lg p-3 pr-8 text-gray-700 focus:outline-none focus:ring focus:ring-purple-500"
              >
                <option value="">Select Driver</option>
                {drivers.map((driver) => (
                  <option key={driver.driver_id} value={driver.driver_id}>
                    {driver.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Assistant Selection */}
            <div className="relative">
              <select
                value={selectedAssistant}
                onChange={(e) => setSelectedAssistant(e.target.value)}
                className="block w-full border border-gray-300 rounded-lg p-3 pr-8 text-gray-700 focus:outline-none focus:ring focus:ring-purple-500"
              >
                <option value="">Select Assistant</option>
                {assistants.map((assistant) => (
                  <option key={assistant.assistant_id} value={assistant.assistant_id}>
                    {assistant.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Truck Selection */}
            <div className="relative">
              <select
                value={selectedTruck}
                onChange={(e) => setSelectedTruck(e.target.value)}
                className="block w-full border border-gray-300 rounded-lg p-3 pr-8 text-gray-700 focus:outline-none focus:ring focus:ring-purple-500"
              >
                <option value="">Select Truck</option>
                {trucks && trucks.length > 0 && trucks.map((truck) => (
                  <option key={truck.truck_id} value={truck.truck_id}>
                    {truck.truck_id}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={handleCreateTruckTrip}
            className="px-6 py-3 mt-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-700 transition duration-300"
          >
            Create Truck Trip
          </button>
        </div>
      )}

      {/* Manage Orders Tab */}
      {activeTab === 'manageOrders' && (
        <div>

          {/* Display Created Truck Trips */}
          <h2 className="text-3xl font-bold mb-4 mt-6 text-purple-800">Created Truck Trips</h2>
          <div className="mb-4">
            <select
              value={selectedTruckTrip}
              onChange={(e) => setSelectedTruckTrip(Number(e.target.value))}
              className="block appearance-none w-full border border-gray-300 rounded-lg p-3 pr-8 text-gray-700 focus:outline-none focus:ring focus:ring-purple-500"
            >
              <option value="">Select a Truck Trip</option>
              {truckTrips.map((trip) => (
                <option key={trip.id} value={trip.id}>
                  Route: {trip.route}, Driver: {trip.driver}, Assistant: {trip.assistant}, Truck: {trip.truck}
                </option>
              ))}
            </select>
          </div>


          <h2 className="text-3xl font-bold mb-4 text-blue-800">Manage Orders</h2>
          <p className="text-gray-600 mb-4">
            Enable orders to assign them to a truck trip.
          </p>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <span className="text-gray-800">{order.description}</span>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(order.id)}
                    onChange={() => handleSelectOrder(order.id)}
                    className="hidden"
                  />
                  <div className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 transition duration-300 ease-in-out ${selectedOrders.includes(order.id) ? 'bg-green-500' : ''}`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition duration-300 ease-in-out ${selectedOrders.includes(order.id) ? 'translate-x-5' : ''}`}></div>
                  </div>
                </label>
              </div>
            ))}
          </div>
          <button
            onClick={handleAssignOrdersToTruck}
            className="px-6 py-3 mt-4 bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold rounded-lg shadow-md hover:from-green-600 hover:to-teal-700 transition duration-300"
          >
            Assign Orders to Selected Truck Trip
          </button>

          {/* Visualization of Truck Trips and Assigned Orders */}
          <h2 className="text-3xl font-bold mb-4 mt-6 text-teal-800">Truck Trips and Assigned Orders</h2>
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="py-3 px-4 border-b bg-gray-100">Truck Trip</th>
                <th className="py-3 px-4 border-b bg-gray-100">Assigned Orders</th>
                <th className="py-3 px-4 border-b bg-gray-100">Completion Status</th>
              </tr>
            </thead>
            <tbody>
              {truckTrips.map((trip) => (
                <tr key={trip.id} className="hover:bg-gray-100 transition duration-200">
                  <td className="py-2 px-4 border-b text-gray-700">
                    Route: {trip.route}, Driver: {trip.driver}, Assistant: {trip.assistant}, Truck: {trip.truck}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-700">
                    {trip.orders.length > 0 ? trip.orders.map((order) => order.description).join(', ') : 'No orders assigned'}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-700 text-center">
                    {trip.completed ? (
                      <span className="text-green-600 font-semibold">Completed</span>
                    ) : (
                      <button
                        onClick={() => handleCompleteTrip(trip.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                      >
                        Mark as Completed
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}
    </div>
  );


};

export default AssignmentPage;












































