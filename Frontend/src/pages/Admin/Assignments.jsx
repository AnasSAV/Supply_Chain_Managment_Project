import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import trainImage from '../../data/TrainTable.jpg'; 

toast.configure();

const AssignOrdersToTrains = () => {
  const [orders, setOrders] = useState([
    { id: 'order-1', name: 'Order 1', destination: 'Location A', arrivalTime: '10:00 AM' },
    { id: 'order-2', name: 'Order 2', destination: 'Location B', arrivalTime: '11:00 AM' },
    { id: 'order-3', name: 'Order 3', destination: 'Location C', arrivalTime: '12:00 PM' },
  ]);

  const [trains, setTrains] = useState([]);

  const [selectedOrders, setSelectedOrders] = useState([]);
  const [currentTrain, setCurrentTrain] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New State for Train Trip creation
  const [newTrain, setNewTrain] = useState({ id: '', branch: '', date: '' });
  const [activeTab, setActiveTab] = useState('create'); // Tab state

  // Sample train data (with start/end times, capacity, and end station)
  const trainOptions = [
    { id: 'T001'},
    { id: 'T002' },
    { id: 'T003'},
    { id: 'T004'},
    { id: 'T005'},
    { id: 'T006'}
  ];

    const trainTable = [
      { train_id: 'T001', start: '06:00:00', end: '10:00:00', capacity: 500, end_station: 'Galle' },
      { train_id: 'T002', start: '12:00:00', end: '16:00:00', capacity: 400, end_station: 'Galle' },
      { train_id: 'T003', start: '05:00:00', end: '11:00:00', capacity: 300, end_station: 'Hambanthota' },
      { train_id: 'T004', start: '13:00:00', end: '19:00:00', capacity: 350, end_station: 'Jaffna' },
      { train_id: 'T005', start: '07:00:00', end: '13:00:00', capacity: 450, end_station: 'Colombo' },
      { train_id: 'T006', start: '14:00:00', end: '20:00:00', capacity: 550, end_station: 'Colombo' },
    ];

  // Handle opening modal for selecting orders
  const openModal = (trainId) => {
    setCurrentTrain(trainId);
    setIsModalOpen(true);
  };

  // Handle closing modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrders([]);
  };

  // Handle creating a new train trip
  const handleCreateTrain = async () => {
    if (!newTrain.id || !newTrain.date) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/trainTrips/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          train_id: newTrain.id,
          date: newTrain.date
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create train trip');
      }

      const data = await response.json();

      // Update local state after successful API call
      const trainId = `train-${trains.length + 1}`;
      setTrains([
        ...trains,
        {
          id: trainId,
          name: newTrain.id,
          date: newTrain.date,
          assignedOrders: [],
        },
      ]);

      // Reset form
      setNewTrain({ id: '', branch: '', date: '' });
      toast.success('Train trip created successfully!');

    } catch (error) {
      console.error('Error creating train trip:', error);
      toast.error(error.message || 'Failed to create train trip');
    }
  };

// Helper function to handle order assignment
const handleAssignOrder = (trainId, orderId) => {
  // Logic to assign the order to the selected train
  const updatedTrains = trains.map((train) => {
    if (train.id === trainId) {
      return {
        ...train,
        assignedOrders: [...train.assignedOrders, orderId],
      };
    }
    return train;
  });
  setTrains(updatedTrains);
  
  // Show alert for successful assignment
  alert("Order successfully assigned!");
};

  // Handle removing assigned orders (unassigning)
  const handleRemoveAssignedOrder = (trainId, orderId) => {
    const updatedTrains = trains.map((train) => {
      if (train.id === trainId) {
        return {
          ...train,
          assignedOrders: train.assignedOrders.filter((order) => order.id !== orderId),
        };
      }
      return train;
    });

    const unassignedOrder = trains
      .find((train) => train.id === trainId)
      .assignedOrders.find((order) => order.id === orderId);

    setTrains(updatedTrains);
    setOrders((prevOrders) => [...prevOrders, unassignedOrder]);
    toast.info(`Order ${unassignedOrder.name} unassigned from ${trains.find((train) => train.id === trainId).name}`);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Get today's date and calculate tomorrow's date
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0]; // Format to "YYYY-MM-DD"

  return (
    <div className="m-2 md:m-10 mt-24 p-6 bg-gradient-to-br from-white to-gray-100 rounded-3xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Train Trips Management</h2>

      {/* Tab Navigation */}
      <div className="flex mb-4 justify-center">
        <button
          className={`px-6 py-2 rounded-t-lg ${
            activeTab === 'create'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('create')}
        >
          Create Train Trip
        </button>
        <button
          className={`px-6 py-2 rounded-t-lg ${
            activeTab === 'assign'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('assign')}
        >
          Order Assignment
        </button>
      </div>

{/* Tab Content */}
{activeTab === 'create' && (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h3 className="text-2xl font-bold mb-4 text-center">Create a New Train Trip</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      {/* Train Dropdown */}
      <div className="col-span-1">
        <label className="block mb-2 text-gray-600">Train ID</label>
        <select
          value={newTrain.id}
          onChange={(e) => setNewTrain({ ...newTrain, id: e.target.value })}
          className="w-full p-2 border rounded bg-white"
        >
          <option value="" disabled>
            Select Train
          </option>
          {trainOptions.map((train) => (
            <option
              key={train.id}
              value={train.id}
              className="p-4 h-auto text-left bg-white hover:bg-gray-200"
            >
              {train.id}
            </option>
          ))}
        </select>
      </div>

      {/* Date */}
      <div className="col-span-1">
        <label className="block mb-2 text-gray-600">Date</label>
        <input
          type="date"
          value={newTrain.date}
          min={minDate} // Set minimum selectable date to tomorrow
          onChange={(e) => setNewTrain({ ...newTrain, date: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>
    </div>

      {/* Train Image */}
      {/* <div className="flex justify-center mt-4">
        <img
          src={trainImage}
          alt="Selected Train"
          className="w-74 h-40 object-cover rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl cursor-pointer"
          onClick={toggleModal}
        />
      </div> */}

<div className="flex justify-center my-10">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
          <tr>
            <th className="py-3 px-6 border-b border-gray-200 text-center">Train ID</th>
            <th className="py-3 px-6 border-b border-gray-200 text-center">Start</th>
            <th className="py-3 px-6 border-b border-gray-200 text-center">End</th>
            <th className="py-3 px-6 border-b border-gray-200 text-center">Capacity</th>
            <th className="py-3 px-6 border-b border-gray-200 text-center">End Station</th>
          </tr>
        </thead>
        <tbody>
          {trainTable.map((train, index) => (
            <tr
              key={train.train_id}
              className={`${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
              } hover:bg-blue-50 transition-colors duration-200`}
            >
              <td className="py-4 px-6 border-b border-gray-200 text-center font-medium text-gray-700">
                {train.train_id}
              </td>
              <td className="py-4 px-6 border-b border-gray-200 text-center font-medium text-gray-700">
                {train.start}
              </td>
              <td className="py-4 px-6 border-b border-gray-200 text-center font-medium text-gray-700">
                {train.end}
              </td>
              <td className="py-4 px-6 border-b border-gray-200 text-center font-medium text-gray-700">
                {train.capacity}
              </td>
              <td className="py-4 px-6 border-b border-gray-200 text-center font-medium text-gray-700">
                {train.end_station}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={toggleModal}
            >
              &times;
            </button>

            {/* Modal Image */}
            <img
              src={trainImage}
              alt="Train Enlarged"
              className="w-[500px] h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}

    {/* Create Button */}
    <div className="flex justify-end mt-6">
      <button
        onClick={handleCreateTrain}
        className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded shadow hover:from-green-500 hover:to-green-700"
      >
        Create Train Trip
      </button>
    </div>
  </div>
)}


{activeTab === 'assign' && (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h3 className="text-2xl font-bold mb-4">Assign Orders to Train Trips</h3>
    <div className="w-full">
      <table className="min-w-full bg-white rounded-lg shadow-lg">
        <thead className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium">Train Trip ID</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Train ID</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Capacity</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Assigned Orders</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Date of Trip</th>
            {/* <th className="px-6 py-3 text-center text-sm font-medium">Action</th> */}
          </tr>
        </thead>
        <tbody>
          {trains.length > 0 ? (
            trains.map((train) => (
              <tr key={train.id} className="bg-gray-100 border-b">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{train.tripId}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{train.name}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{train.capacity}</td>
                <td className="px-6 py-4 text-sm  text-gray-900">
                  <div className="flex flex-wrap">
                    {orders.map((order) => (
                      <span key={order.id} className="flex items-center mb-2">
                        <span
                          className={`px-3 py-1 mr-0 rounded-full ${
                            train.assignedOrders.includes(order.id)
                              ? "bg-green-400 text-white"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {order.name} ({order.destination})
                        </span>
                        <button
                          className={`px-2 py-1 ml-0 rounded ${
                            train.assignedOrders.includes(order.id)
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-blue-500 hover:bg-blue-600 text-white"
                          }`}
                          disabled={train.assignedOrders.includes(order.id)}
                          onClick={() => {
                            handleAssignOrder(train.id, order.id);
                          }}
                        >
                          {train.assignedOrders.includes(order.id) ? "Assigned" : "Assign"}
                        </button>
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{train.date}</td>
                {/* <td className="px-6 py-4 text-center">
                  <button
                    disabled
                    className="bg-gradient-to-r from-gray-400 to-gray-500 text-white px-4 py-2 rounded shadow cursor-not-allowed"
                  >
                    Orders Assigned
                  </button>
                </td> */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-600">
                No train trips created yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
)}
    </div>
  );
};

export default AssignOrdersToTrains;





























