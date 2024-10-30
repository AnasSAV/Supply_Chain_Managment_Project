import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

const ManagerRoster = () => {
  const [activeTab, setActiveTab] = useState('Drivers');
  const [showModal, setShowModal] = useState(false);
  const [newPerson, setNewPerson] = useState({
    id: '',
    email: '',
    name: '',
    contactNumber: '',
    password: '',
    status: 'Available'
  });
  const [drivers, setDrivers] = useState([
    { id: 'D001', name: 'Driver 1', workHours: 20, workHoursLeft: 40, recentTrip: 'Colombo to Kandy', location: 'Colombo', route: 'Route A', status: 'Available' },
    { id: 'D002', name: 'Driver 2', workHours: 30, workHoursLeft: 30, recentTrip: 'Kandy to Galle', location: 'Kandy', route: 'Route B', status: 'Unavailable' },
  ]);

  const [assistants, setAssistants] = useState([
    { id: 'A001', name: 'Assistant 1', workHours: 25, workHoursLeft: 35, recentTrip: 'Colombo to Kandy', location: 'Colombo', route: 'Route C', status: 'Available' },
    { id: 'A002', name: 'Assistant 2', workHours: 15, workHoursLeft: 45, recentTrip: 'Kandy to Galle', location: 'Kandy', route: 'Route D', status: 'Unavailable' },
  ]);

  // Get user context for branch_id
  const { user } = useContext(AuthContext);

  // Add state for manager info
  const [manager, setManager] = useState({
    name: '',
    branch: '',
    details: '',
    photo: 'https://via.placeholder.com/48' // Default photo
  });

  // Fetch manager info when component mounts
  useEffect(() => {
    const fetchManagerInfo = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token || !user.branch_id) {
          console.error('No token or branch_id found');
          return;
        }

        const response = await axios.post(
          'http://localhost:3000/api/truckTrips/get-branch-manager-info',
          { branch_id: user.branch_id },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        // Now the response.data should contain the manager info directly
        const managerData = response.data;
        setManager({
          name: managerData.manager_name,
          branch: managerData.branch_name,
          details: `Branch ID: ${managerData.branch_id}`,
          photo: 'https://via.placeholder.com/48'
        });

      } catch (error) {
        console.error('Error fetching manager info:', error);
        setManager({
          name: 'Error loading data',
          branch: 'Error loading data',
          details: 'Error loading data',
          photo: 'https://via.placeholder.com/48'
        });
      }
    };

    if (user.branch_id) {
      fetchManagerInfo();
    }
  }, [user.branch_id]);

  // Add a useEffect to monitor manager state changes
  useEffect(() => {
    console.log('Manager state updated:', manager);
  }, [manager]);

  const handleTabSwitch = (tab) => setActiveTab(tab);
  const handleAddNewPerson = () => setShowModal(true);
  const handleModalClose = () => {
    setShowModal(false);
    setNewPerson({
      id: '',
      email: '',
      name: '',
      contactNumber: '',
      password: '',
      status: 'Available'
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'Drivers') {
      setDrivers([...drivers, newPerson]);
    } else {
      setAssistants([...assistants, newPerson]);
    }
    handleModalClose();
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50 flex flex-col items-center">
      <h1 className="text-3xl font-semibold text-gray-700 mb-8">Manager Roster</h1>

      {/* Manager Info Card */}
      <div className="bg-white shadow-lg rounded-lg p-4 mb-8 w-full max-w-3xl flex items-center space-x-4 transform transition hover:scale-105 hover:shadow-xl duration-300">
        <div className="relative w-16 h-16 flex-shrink-0">
          <img
            src={manager.photo}
            alt={manager.name}
            className="w-full h-full rounded-full border-2 border-blue-500 shadow-lg object-cover"
          />
          <span className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></span>
        </div>
        <div className="flex-grow text-left space-y-1">
          <h3 className="text-lg font-semibold text-gray-800">
            {manager.name || 'Loading...'}
          </h3>
          <p className="text-sm text-gray-600">
            Branch: {manager.branch || 'Loading...'}
          </p>
          <p className="text-xs text-gray-500">
            {manager.details || 'Loading...'}
          </p>
        </div>
        <button className="text-blue-500 font-semibold text-sm hover:underline hover:text-blue-600 transition duration-200">
          Edit Profile
        </button>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-6 space-x-6">
        <button
          onClick={() => handleTabSwitch('Drivers')}
          className={`px-4 py-2 rounded-md font-medium ${activeTab === 'Drivers' ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white' : 'text-gray-600 bg-gray-300'}`}
        >
          Your Drivers
        </button>
        <button
          onClick={() => handleTabSwitch('Assistants')}
          className={`px-4 py-2 rounded-md font-medium ${activeTab === 'Assistants' ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white' : 'text-gray-600 bg-gray-300'}`}
        >
          Your Assistants
        </button>
      </div>

      {/* Add New Person Button */}
      <button
        onClick={handleAddNewPerson}
        className="mb-4 px-4 py-2 bg-gradient-to-r from-emerald-400 to-cyan-400 text-white rounded-lg font-medium hover:bg-gradient-to-r from-emerald-400 to-cyan-4000 transition"
      >
        Add New {activeTab === 'Drivers' ? 'Driver' : 'Assistant'}
      </button>

      {/* Roster Table */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">{activeTab} Overview</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-gray-500 border-b">
              <th className="p-2">Name</th>
              <th className="p-2">ID</th>
              <th className="p-2">Work Hours</th>
              <th className="p-2">Hours Left</th>
              <th className="p-2">Recent Trip</th>
              <th className="p-2">Location</th>
              <th className="p-2">Route</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {(activeTab === 'Drivers' ? drivers : assistants).map((person, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="p-2">{person.name}</td>
                <td className="p-2">{person.id}</td>
                <td className="p-2">{person.workHours}</td>
                <td className="p-2">{person.workHoursLeft}</td>
                <td className="p-2">{person.recentTrip}</td>
                <td className="p-2">{person.location}</td>
                <td className="p-2">{person.route}</td>
                <td className={`p-2 ${person.status === 'Available' ? 'text-green-500' : 'text-red-500'}`}>{person.status}</td>
                <td className="p-2">
                  <button className="text-sm text-blue-600 hover:underline">View Profile</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Updated Modal for Adding New Driver/Assistant */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Add New {activeTab === 'Drivers' ? 'Driver' : 'Assistant'}
            </h3>
            <form onSubmit={handleFormSubmit}>
              <div className="space-y-4">
                {/* ID Field */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1" htmlFor="id">
                    ID
                  </label>
                  <input
                    type="text"
                    id="id"
                    placeholder="Enter ID"
                    value={newPerson.id}
                    onChange={(e) => setNewPerson({ ...newPerson, id: e.target.value })}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter Email"
                    value={newPerson.email}
                    onChange={(e) => setNewPerson({ ...newPerson, email: e.target.value })}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Name Field */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter Name"
                    value={newPerson.name}
                    onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Contact Number Field */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1" htmlFor="contactNumber">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    id="contactNumber"
                    placeholder="Enter Contact Number"
                    value={newPerson.contactNumber}
                    onChange={(e) => setNewPerson({ ...newPerson, contactNumber: e.target.value })}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter Password"
                    value={newPerson.password}
                    onChange={(e) => setNewPerson({ ...newPerson, password: e.target.value })}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 p-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded font-medium hover:opacity-90 transition-opacity"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={handleModalClose}
                    className="flex-1 p-2 bg-gray-500 text-white rounded font-medium hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerRoster;
