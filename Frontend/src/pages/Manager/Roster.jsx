import React, { useState } from 'react';

const ManagerRoster = () => {
  const [activeTab, setActiveTab] = useState('Drivers');

  const manager = {
    name: 'Manager 1',
    branch: 'Colombo',
    details: 'Branch ID : B01',
    photo: 'https://via.placeholder.com/48'
  };

  const drivers = [
    { id: 'D001', name: 'Driver 1', workHours: 20, workHoursLeft: 40, recentTrip: 'Colombo to Kandy', location: 'Colombo', route: 'Route A', status: 'Available' },
    { id: 'D002', name: 'Driver 2', workHours: 30, workHoursLeft: 30, recentTrip: 'Kandy to Galle', location: 'Kandy', route: 'Route B', status: 'Unavailable' },
  ];

  const assistants = [
    { id: 'A001', name: 'Assistant 1', workHours: 25, workHoursLeft: 35, recentTrip: 'Colombo to Kandy', location: 'Colombo', route: 'Route C', status: 'Available' },
    { id: 'A002', name: 'Assistant 2', workHours: 15, workHoursLeft: 45, recentTrip: 'Kandy to Galle', location: 'Kandy', route: 'Route D', status: 'Unavailable' },
  ];

  const handleTabSwitch = (tab) => setActiveTab(tab);

  return (
    <div className="min-h-screen p-8 bg-gray-50 flex flex-col items-center">
      <h1 className="text-3xl font-semibold text-gray-700 mb-8">Manager Roster</h1>

      <div className="bg-white shadow-lg rounded-lg p-4 mb-8 w-full max-w-3xl flex items-center space-x-4 transform transition hover:scale-105 hover:shadow-xl duration-300">
        <div className="relative w-16 h-16 flex-shrink-0">
          <img
            src={manager.photo}
            alt="Manager"
            className="w-full h-full rounded-full border-2 border-blue-500 shadow-lg"
            style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)' }}
          />
          <span className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></span>
        </div>
        <div className="flex-grow text-left space-y-1">
          <h3 className="text-lg font-semibold text-gray-800">{manager.name}</h3>
          <p className="text-sm text-gray-600">{manager.branch}</p>
          <p className="text-xs text-gray-500">{manager.details}</p>
        </div>
        <button className="text-blue-500 font-semibold text-sm hover:underline hover:text-blue-600 transition duration-200">Edit</button>
      </div>


      <div className="flex justify-center mb-6 space-x-6">
        <button
          onClick={() => handleTabSwitch('Drivers')}
          className={`px-4 py-2 rounded-md font-medium ${activeTab === 'Drivers' ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white' : 'text-gray-600 bg-gray-100'}`}
        >
          Your Drivers
        </button>
        <button
          onClick={() => handleTabSwitch('Assistants')}
          className={`px-4 py-2 rounded-md font-medium ${activeTab === 'Assistants' ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white' : 'text-gray-600 bg-gray-100'}`}
        >
          Your Assistants
        </button>
      </div>

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
                <td className="p-2" title={person.recentTrip}>{person.recentTrip}</td>
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

      <div className="mt-8 bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Performance Overview</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
            <h3 className="text-sm text-gray-600">Total Drivers</h3>
            <p className="text-2xl font-semibold text-gray-800">{drivers.length}</p>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
            <h3 className="text-sm text-gray-600">Total Assistants</h3>
            <p className="text-2xl font-semibold text-gray-800">{assistants.length}</p>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
            <h3 className="text-sm text-gray-600">Active Trips</h3>
            <p className="text-2xl font-semibold text-gray-800">5</p> {/* Replace with actual count */}
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
            <h3 className="text-sm text-gray-600">Avg Work Hours Left</h3>
            <p className="text-2xl font-semibold text-gray-800">30 hrs</p> {/* Replace with calculated average */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerRoster;