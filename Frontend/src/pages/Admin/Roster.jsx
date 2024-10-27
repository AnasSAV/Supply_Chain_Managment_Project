import React, { useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

const Roster = () => {
  const [showManagers, setShowManagers] = useState(false);
  const [expandedManager, setExpandedManager] = useState(null);
  const [expandedRole, setExpandedRole] = useState({ manager: null, role: null });

  const handleToggleManagers = () => {
    setShowManagers(!showManagers);
  };

  const handleExpandManager = (managerIndex) => {
    setExpandedManager(expandedManager === managerIndex ? null : managerIndex);
    setExpandedRole({ manager: null, role: null });
  };

  const handleExpandRole = (managerIndex, role) => {
    setExpandedRole({
      manager: managerIndex,
      role: expandedRole.role === role ? null : role,
    });
  };

  // Sample data with profile pictures, usernames, and details
  const managers = [
    { name: 'Manager 1', branch: 'Colombo', details: 'Branch ID : B01', photo: 'https://via.placeholder.com/48' },
    { name: 'Manager 2', branch: 'Jaffna', details: 'Branch ID : B02', photo: 'https://via.placeholder.com/48' },
    { name: 'Manager 3', branch: 'Galle', details: 'Branch ID : B03', photo: 'https://via.placeholder.com/48' },
    { name: 'Manager 4', branch: 'Matara', details: 'Branch ID : B04', photo: 'https://via.placeholder.com/48' },
  ];

  const admin = [
    { name: 'Admin 1', username: '@admin1', details: 'Admin Main Branch', photo: 'https://via.placeholder.com/48' }
  ];
  
  const drivers = [
    { name: 'Driver 1', username: '@driver1', details: 'Senior Driver', photo: 'https://via.placeholder.com/32' },
    { name: 'Driver 2', username: '@driver2', details: 'Junior Driver', photo: 'https://via.placeholder.com/32' },
    { name: 'Driver 3', username: '@driver3', details: 'Contract Driver', photo: 'https://via.placeholder.com/32' },
  ];
  
  const assistants = [
    { name: 'Assistant 1', username: '@assistant1', details: 'Driver Assistant', photo: 'https://via.placeholder.com/32' },
    { name: 'Assistant 2', username: '@assistant2', details: 'Logistics Assistant', photo: 'https://via.placeholder.com/32' },
    { name: 'Assistant 3', username: '@assistant3', details: 'Operations Assistant', photo: 'https://via.placeholder.com/32' },
  ];

  return (
    <div className="flex flex-col items-center space-y-6 p-8 bg-cover bg-no-repeat bg-center min-h-screen rounded-sm" style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/white-brush-stroke-texture-background_53876-132775.jpg?t=st=1729978259~exp=1729981859~hmac=1a71a738adbdf7c7a507259f9a7a4458465db378911cd1c2cbdd431420027a6b&w=996'}}>
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Team Roster</h1>

      {/* Admin Node */}
      <div
        className="p-4 w-48 h-60 border-1 border-blue-900 text-black rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col items-center transform-gpu perspective-1000"
      >
        {/* Profile Picture */}
        <img
          src={admin[0].photo}
          alt="Admin 1"
          className="w-16 h-16 rounded-full mb-4 shadow-md border-2 border-white"
        />
        
        {/* Admin Details */}
        <div className="text-center">
          <h3 className="font-semibold text-sm">{admin[0].name}</h3>
          <p className="text-xs">{admin[0].username}</p>
          <p className="text-xs italic">{admin[0].details}</p>
        </div>
      </div>

      {/* Connecting line to managers */}
      {showManagers && (
        <div className="relative flex items-center mt-1">
          {/* Vertical Line */}
          <div className="w-0.5 h-8 bg-gray-400"></div>
          {/* Left Branch for Drivers */}
          <div className="absolute left-[-75px] top-8 w-40 h-0.5 bg-gray-400"></div>
          <div className="absolute left-[-95px] top-8 w-0.5 h-4 bg-gray-400 "></div>
          {/* Right Branch for Assistants */}
          <div className="absolute right-[-75px] top-8 w-40 h-0.5 bg-gray-400"></div>
          <div className="absolute right-[-95px] top-8 w-0.5 h-4 bg-gray-400"></div>
          {/* Left Branch for Drivers */}
          <div className="absolute left-[-280px] top-8 w-80 h-0.5 bg-gray-400"></div>
          <div className="absolute left-[-280px] top-8 w-0.5 h-4 bg-gray-400 "></div>
          {/* Right Branch for Assistants */}
          <div className="absolute right-[-280px] top-8 w-80 h-0.5 bg-gray-400"></div>
          <div className="absolute right-[-280px] top-8 w-0.5 h-4 bg-gray-400"></div>
        </div>
      )}

      {/* Managers Level */}
      {showManagers && (
        <div className="flex flex-wrap justify-center gap-10 mt-3 relative">
          {managers.map((manager, index) => (
            <div key={index} className="flex flex-col items-center space-y-4 relative">
              <div
                className="p-4 w-36 h-56 bg-white bg-opacity-10 border-1 border-blue-900 text-black rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col items-center transform-gpu perspective-1000"
                onClick={() => handleExpandManager(index)}
              >
                {/* Profile Picture */}
                <img
                  src={manager.photo}
                  alt={manager.name}
                  className="w-16 h-16 rounded-full mb-4 shadow-md border-2 border-white"
                />
                
                {/* Manager Details */}
                <div className="text-center">
                  <h3 className="font-semibold text-sm">{manager.name}</h3>
                  <p className="text-xs">{manager.branch}</p>
                  <p className="text-xs italic">{manager.details}</p>
                </div>
              </div>

              {/* Connecting lines from manager to roles */}
              {expandedManager === index && (
                <div className="relative flex items-center mt-1">
                  {/* Vertical Line */}
                  <div className="w-0.5 h-8 bg-gray-400"></div>
                  {/* Left Branch for Drivers */}
                  <div className="absolute left-[-75px] top-8 w-40 h-0.5 bg-gray-400"></div>
                  <div className="absolute left-[-85px] top-8 w-0.5 h-4 bg-gray-400 "></div>
                  {/* Right Branch for Assistants */}
                  <div className="absolute right-[-75px] top-8 w-40 h-0.5 bg-gray-400"></div>
                  <div className="absolute right-[-85px] top-8 w-0.5 h-4 bg-gray-400"></div>
                </div>
              )}

              {/* Drivers and Assistants Level */}
              {expandedManager === index && (
                <div className="flex space-x-10 mt-10 transition-all duration-300 ease-in-out">
                  {/* Drivers Section */}
                  <div className="flex flex-col items-center">
                    <div
                      className="p-2 w-32 bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900 text-white rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out flex items-center justify-center"
                      onClick={() => handleExpandRole(index, 'Drivers')}
                    >
                      Drivers
                      {expandedRole.manager === index && expandedRole.role === 'Drivers' ? (
                        <FaChevronDown className="ml-2" />
                      ) : (
                        <FaChevronRight className="ml-2" />
                      )}
                    </div>
                    {expandedRole.manager === index && expandedRole.role === 'Drivers' && (
                      <div className="flex flex-col space-y-2 mt-4">
                        {drivers.map((driver, i) => (
                          <div key={i} className="flex items-center space-x-2 bg-white rounded-lg shadow p-2 w-32">
                            <img
                              src={driver.photo}
                              alt={driver.name}
                              className="w-10 h-10 rounded-full"
                            />
                            <div className="text-sm">
                              <h3 className="font-semibold text-sm">{driver.name}</h3>
                              <p className="text-xs text-gray-500">{driver.username}</p>
                              <p className="text-xs italic">{driver.details}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Assistants Section */}
                  <div className="flex flex-col items-center">
                    <div
                      className="p-2 w-32 bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900 text-white rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out flex items-center justify-center"
                      onClick={() => handleExpandRole(index, 'Assistants')}
                    >
                      Assistants
                      {expandedRole.manager === index && expandedRole.role === 'Assistants' ? (
                        <FaChevronDown className="ml-2" />
                      ) : (
                        <FaChevronRight className="ml-2" />
                      )}
                    </div>
                    {expandedRole.manager === index && expandedRole.role === 'Assistants' && (
                      <div className="flex flex-col space-y-2 mt-4">
                        {assistants.map((assistant, i) => (
                          <div key={i} className="flex items-center space-x-2 bg-white rounded-lg shadow p-2 w-32">
                            <img
                              src={assistant.photo}
                              alt={assistant.name}
                              className="w-10 h-10 rounded-full"
                            />
                            <div className="text-sm">
                              <h3 className="font-semibold text-sm">{assistant.name}</h3>
                              <p className="text-xs text-gray-500">{assistant.username}</p>
                              <p className="text-xs italic">{assistant.details}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Toggle Managers Button */}
      <button
        className="mt-8 px-4 py-2 bg-gradient-to-r from-slate-900 to-slate-700 text-white rounded-lg shadow hover:bg-blue-700 transition-colors duration-300"
        onClick={handleToggleManagers}
      >
        {showManagers ? 'Hide Managers' : 'Show Managers'}
      </button>
    </div>
  );
};

export default Roster;





