import React, { useState } from 'react';

const ManagerRoster = () => {
  const [activeTab, setActiveTab] = useState('Drivers');
  const [showModal, setShowModal] = useState(false);
  const [newPerson, setNewPerson] = useState({ name: '', id: '', workHours: 0, workHoursLeft: 0, recentTrip: '', location: '', route: '', status: 'Available' });
  const [drivers, setDrivers] = useState([
    { id: 'D001', name: 'Driver 1', workHours: 20, workHoursLeft: 40, recentTrip: 'Colombo to Kandy', location: 'Colombo', route: 'Route A', status: 'Available' },
    { id: 'D002', name: 'Driver 2', workHours: 30, workHoursLeft: 30, recentTrip: 'Kandy to Galle', location: 'Kandy', route: 'Route B', status: 'Unavailable' },
  ]);

  const [assistants, setAssistants] = useState([
    { id: 'A001', name: 'Assistant 1', workHours: 25, workHoursLeft: 35, recentTrip: 'Colombo to Kandy', location: 'Colombo', route: 'Route C', status: 'Available' },
    { id: 'A002', name: 'Assistant 2', workHours: 15, workHoursLeft: 45, recentTrip: 'Kandy to Galle', location: 'Kandy', route: 'Route D', status: 'Unavailable' },
  ]);

  const manager = {
    name: 'Manager 1',
    branch: 'Colombo',
    details: 'Branch ID : B01',
    photo: 'https://via.placeholder.com/48'
  };

  const handleTabSwitch = (tab) => setActiveTab(tab);
  const handleAddNewPerson = () => setShowModal(true);
  const handleModalClose = () => {
    setShowModal(false);
    setNewPerson({ name: '', id: '', workHours: 0, workHoursLeft: 0, recentTrip: '', location: '', route: '', status: 'Available' });
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
            alt="Manager"
            className="w-full h-full rounded-full border-2 border-blue-500 shadow-lg"
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

      {/* Modal for Adding New Driver/Assistant */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Add New {activeTab === 'Drivers' ? 'Driver' : 'Assistant'}</h3>
            <form onSubmit={handleFormSubmit}>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter Name"
                value={newPerson.name}
                onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
                className="w-full p-2 mb-4 border rounded"
              />
              
              <label className="block text-gray-700 font-medium mb-1" htmlFor="id">ID</label>
              <input
                type="text"
                id="id"
                placeholder="Enter ID"
                value={newPerson.id}
                onChange={(e) => setNewPerson({ ...newPerson, id: e.target.value })}
                className="w-full p-2 mb-4 border rounded"
              />
              
              <label className="block text-gray-700 font-medium mb-1" htmlFor="workHours">Work Hours</label>
              <input
                type="number"
                id="workHours"
                placeholder="Enter Work Hours"
                value={newPerson.workHours}
                onChange={(e) => setNewPerson({ ...newPerson, workHours: e.target.value })}
                className="w-full p-2 mb-4 border rounded"
              />
              
              <label className="block text-gray-700 font-medium mb-1" htmlFor="workHoursLeft">Work Hours Left</label>
              <input
                type="number"
                id="workHoursLeft"
                placeholder="Enter Work Hours Left"
                value={newPerson.workHoursLeft}
                onChange={(e) => setNewPerson({ ...newPerson, workHoursLeft: e.target.value })}
                className="w-full p-2 mb-4 border rounded"
              />

              <button type="submit" className="w-full p-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded font-medium">Add</button>
              <button type="button" onClick={handleModalClose} className="w-full p-2 mt-2 bg-gray-500 text-white rounded font-medium">Cancel</button>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerRoster;
