import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import trainImage from '../../data/TrainTable.jpg'; 

toast.configure();

const AssignOrdersToTrains = () => {
  const [orders, setOrders] = useState([]);

  const [trains, setTrains] = useState([]);

  const [selectedOrders, setSelectedOrders] = useState([]);
  const [currentTrain, setCurrentTrain] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New State for Train Trip creation
  const [newTrain, setNewTrain] = useState({ id: '', branch: '', date: '' });
  const [activeTab, setActiveTab] = useState('create'); // Tab state

  // Sample train data (with start/end times, capacity, and end station)
  const trainOptions = [
    { id: 'T001', branch: 'B002' },
    { id: 'T002', branch: 'B002' },
    { id: 'T003', branch: 'B004' },
    { id: 'T004', branch: 'B003' },
    { id: 'T005', branch: 'B001' },
    { id: 'T006', branch: 'B001' }
  ];

    const trainTable = [
      { train_id: 'T001', branch_id: 'B002', start: '06:00:00', end: '10:00:00', capacity: 500, end_station: 'Galle' },
      { train_id: 'T002', branch_id: 'B002', start: '12:00:00', end: '16:00:00', capacity: 400, end_station: 'Galle' },
      { train_id: 'T003', branch_id: 'B004', start: '05:00:00', end: '11:00:00', capacity: 300, end_station: 'Hambanthota' },
      { train_id: 'T004', branch_id: 'B003', start: '13:00:00', end: '19:00:00', capacity: 350, end_station: 'Jaffna' },
      { train_id: 'T005', branch_id: 'B001', start: '07:00:00', end: '13:00:00', capacity: 450, end_station: 'Colombo' },
      { train_id: 'T006', branch_id: 'B001', start: '14:00:00', end: '20:00:00', capacity: 550, end_station: 'Colombo' },
    ];

  // Update openModal function to use train details directly from trainTable
  const openModal = async (trainId) => {
    try {
      const train = trains.find(t => t.id === trainId);
      const trainDetails = trainTable.find(t => t.train_id === train.name);

      if (!trainDetails) {
        throw new Error('Train details not found');
      }

      const response = await fetch('http://localhost:3000/api/trainTrips/get-orders-by-train-and-branch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          train_id: trainDetails.train_id,
          branch_id: trainDetails.branch_id
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const { data } = await response.json();
      
      const formattedOrders = data.map(order => ({
        id: order.order_id,
        name: `Order ${order.order_id}`,
        destination: order.destination || 'N/A'
      }));

      setOrders(formattedOrders);
      setCurrentTrain(trainDetails.train_id); // Store the actual train_id
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders for assignment');
    }
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
      // Find the selected train details from trainTable
      const selectedTrain = trainTable.find(train => train.train_id === newTrain.id);
      
      if (!selectedTrain) {
        throw new Error('Train details not found');
      }

      const response = await fetch('http://localhost:3000/api/trainTrips/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          train_id: newTrain.id,
          date: newTrain.date,
          branch_id: selectedTrain.branch_id  // Now we have access to the branch_id
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

  // Handle assigning selected orders to train
  const handleAssignOrders = async () => {
    if (selectedOrders.length === 0) {
      toast.warn('No orders selected.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/trainTrips/assign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          train_id: currentTrain,
          order_ids: selectedOrders
        })
      });

      if (!response.ok) {
        throw new Error('Failed to assign orders');
      }

      // Create order details from selected orders
      const selectedOrderDetails = orders
        .filter(order => selectedOrders.includes(order.id));

      const updatedTrains = trains.map((train) => {
        if (train.id === currentTrain) {
          return {
            ...train,
            assignedOrders: [...train.assignedOrders, ...selectedOrderDetails],
          };
        }
        return train;
      });

      setTrains(updatedTrains);
      setOrders(orders.filter((order) => !selectedOrders.includes(order.id)));
      setSelectedOrders([]);
      closeModal();
      toast.success('Orders assigned successfully');
    } catch (error) {
      console.error('Error assigning orders:', error);
      toast.error('Failed to assign orders');
    }
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

  // Update the Modal JSX to show loading state and handle empty orders
  const renderOrderAssignmentModal = () => {
    if (!isModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white rounded-lg p-6 w-96">
          <h3 className="text-lg font-bold mb-4">Select Orders to Assign</h3>
          {orders.length > 0 ? (
            <>
              <ul className="mb-4 max-h-60 overflow-y-auto">
                {orders.map((order) => (
                  <li key={order.id} className="flex items-center justify-between p-2 hover:bg-gray-50">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={(e) =>
                          setSelectedOrders((prev) =>
                            e.target.checked
                              ? [...prev, order.id]
                              : prev.filter((id) => id !== order.id)
                          )
                        }
                        className="form-checkbox h-4 w-4 text-blue-500"
                      />
                      <span>{order.name} ({order.destination})</span>
                    </label>
                  </li>
                ))}
              </ul>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={closeModal}
                  className="bg-red-400 text-white px-4 py-2 rounded shadow hover:bg-red-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssignOrders}
                  className="bg-green-400 text-white px-4 py-2 rounded shadow hover:bg-green-500"
                >
                  Assign
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-600">No orders available for assignment</p>
              <button
                onClick={closeModal}
                className="mt-4 bg-gray-400 text-white px-4 py-2 rounded shadow hover:bg-gray-500"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

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
                  <th className="px-6 py-3 text-left text-sm font-medium">Train ID</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Assigned Orders</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Date of Trip</th> {/* New Field for Date */}
                  <th className="px-6 py-3 text-center text-sm font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {trains.length > 0 ? (
                  trains.map((train) => (
                    <tr key={train.id} className="bg-gray-100 border-b">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{train.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {train.assignedOrders.length > 0 ? (
                          <div className="flex flex-wrap">
                            {train.assignedOrders.map((order) => (
                              <span
                                key={order.id}
                                className="bg-gradient-to-r from-green-400 to-green-600 text-white px-3 py-1 mr-2 mb-2 rounded-full flex items-center"
                              >
                                {order.name} ({order.destination})
                                <button
                                  className="ml-2  text-white px-1 py-1"
                                  onClick={() => handleRemoveAssignedOrder(train.id, order.id)}
                                >
                                  &times;
                                </button>
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span>No orders assigned</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{train.date}</td> {/* Date field */}
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => openModal(train.id)}
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded shadow hover:bg-gradient-to-r from-cyan-500 to-blue-500"
                        >
                          Assign Orders
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-600">No train trips created yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Replace the existing modal with the new one */}
          {renderOrderAssignmentModal()}
        </div>
      )}
    </div>
  );
};

export default AssignOrdersToTrains;


































