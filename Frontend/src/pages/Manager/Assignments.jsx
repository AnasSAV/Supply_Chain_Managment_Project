import React, { useState } from 'react';

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
  const [orders, setOrders] = useState([
    { id: 1, description: 'Order 1', confirmed: false },
    { id: 2, description: 'Order 2', confirmed: false },
    { id: 3, description: 'Order 3', confirmed: false },
    { id: 4, description: 'Order 4', confirmed: false },
  ]);
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

  // Dummy data for drivers, assistants, routes, and trucks
  const drivers = [
    { name: 'John Doe', workHoursLeft: 4, photo: 'https://example.com/john.jpg' },
    { name: 'Jane Smith', workHoursLeft: 6, photo: 'https://example.com/jane.jpg' },
  ];

  const assistants = [
    { name: 'Mark Brown', workHoursLeft: 5, photo: 'https://example.com/mark.jpg' },
    { name: 'Emma White', workHoursLeft: 3, photo: 'https://example.com/emma.jpg' },
  ];

  const routes = ['Route A', 'Route B', 'Route C'];
  const trucks = ['Truck 1', 'Truck 2', 'Truck 3'];

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
  const handleCreateTruckTrip = () => {
    if (!selectedRoute || !selectedDriver || !selectedAssistant || !selectedTruck) {
      alert('Please select Route, Driver, Assistant, Truck, and specify the Order Arrival time');
      return;
    }

    const newTruckTrip = {
      id: Date.now(),  // Unique id for the trip
      route: selectedRoute,
      driver: selectedDriver,
      assistant: selectedAssistant,
      truck: selectedTruck,
      orders: [],
      arrival: orderArrival, // Include the order arrival time
    };

    setTruckTrips([...truckTrips, newTruckTrip]);
    clearSelections();
    alert('Truck trip created successfully!');
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

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col">
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirm Assignment"
        message="Are you sure you want to assign the selected orders to the train trip?"
        onConfirm={confirmOrderAssignment}
      />
  
      {/* Tab Navigation */}
      <div className="flex justify-center mb-6 space-x-4">
        <button
          onClick={() => setActiveTab('orderArrival')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'orderArrival' ? 'bg-purple-600 text-white' : 'bg-white text-purple-600 border border-purple-600'
          } transition duration-300`}
        >
          Order Arrival
        </button>
        <button
          onClick={() => setActiveTab('createTrip')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'createTrip' ? 'bg-purple-600 text-white' : 'bg-white text-purple-600 border border-purple-600'
          } transition duration-300`}
        >
          Create Train Trip
        </button>
        <button
          onClick={() => setActiveTab('manageOrders')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'manageOrders' ? 'bg-purple-600 text-white' : 'bg-white text-purple-600 border border-purple-600'
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
                key={order.id}
                className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <span className="text-gray-800">{order.description}</span>
                <button
                  onClick={() => handleConfirmOrder(order.id)}
                  className={`px-4 py-1 rounded-lg ${order.confirmed ? 'bg-gray-400' : 'bg-blue-600'} text-white`}
                  disabled={order.confirmed}
                >
                  {order.confirmed ? 'Confirmed' : 'Confirm'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
  
      {/* Create Train Trip Tab */}
      {activeTab === 'createTrip' && (
        <div>
          <h2 className="text-3xl font-bold mb-4 text-purple-800">Create Train Trip</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            {/* Route Selection */}
            <div className="relative">
              <select
                value={selectedRoute}
                onChange={(e) => setSelectedRoute(e.target.value)}
                className="block w-full border border-gray-300 rounded-lg p-3 pr-8 text-gray-700 focus:outline-none focus:ring focus:ring-purple-500"
              >
                <option value="">Select Route</option>
                {routes.map((route, index) => (
                  <option key={index} value={route}>
                    {route}
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
                {drivers.map((driver, index) => (
                  <option key={index} value={driver.name}>
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
                {assistants.map((assistant, index) => (
                  <option key={index} value={assistant.name}>
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
                {trucks.map((truck, index) => (
                  <option key={index} value={truck}>
                    {truck}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={handleCreateTruckTrip}
            className="px-6 py-3 mt-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-700 transition duration-300"
          >
            Create Train Trip
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
            Enable orders to assign them to a train trip.
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
            Assign Orders to Selected Train Trip
          </button>
  
          {/* Visualization of Train Trips and Assigned Orders */}
          <h2 className="text-3xl font-bold mb-4 mt-6 text-teal-800">Train Trips and Assigned Orders</h2>
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="py-3 px-4 border-b bg-gray-100">Train Trip</th>
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





































