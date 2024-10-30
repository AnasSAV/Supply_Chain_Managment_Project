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
    { name: 'Manager 1', branch: 'Colombo', details: 'Branch ID : B01', photo: 'https://img.freepik.com/free-photo/person-pressing-buzzer_23-2149731426.jpg?t=st=1730299779~exp=1730303379~hmac=116d8f1c5f263c86eee950e3cd6a831b7a70d77b35bb2bd1c0a2643e24ac5b52&w=826' },
    { name: 'Manager 2', branch: 'Jaffna', details: 'Branch ID : B02', photo: 'https://img.freepik.com/free-photo/man-practicing-rock-climbing-bouldering-wall-sports_23-2151724749.jpg?t=st=1730299891~exp=1730303491~hmac=cebbed1b2d061261aa46e52284223ce671b2ffda475986d0dc427f9930abe6a5&w=826' },
    { name: 'Manager 3', branch: 'Galle', details: 'Branch ID : B03', photo: 'https://img.freepik.com/free-photo/man-striped-shirt-looks-surprised-confused_144627-68195.jpg?t=st=1730300343~exp=1730303943~hmac=537a55c99ca7f230038fe72bcf62fb0e1d3342e5cf15019b99d04ba512a9750a&w=1800' },
    { name: 'Manager 4', branch: 'Matara', details: 'Branch ID : B04', photo: 'https://img.freepik.com/free-photo/happy-afro-man_1368-6875.jpg?t=st=1730300360~exp=1730303960~hmac=f1fa86b412bb08d806fc14a820600f1f3e0d418a137c79cc7b4db7877db0f0c1&w=1800' },
    { name: 'Manager 3', branch: 'Galle', details: 'Branch ID : B03', photo: 'https://img.freepik.com/free-photo/messy-male-geek-look-tired-confused_176420-16042.jpg?t=st=1730300401~exp=1730304001~hmac=c3867b227aadb264f1f163a0f5deaacad52aeb3f7aec5665b45a4eba0d638222&w=900' },
    { name: 'Manager 4', branch: 'Matara', details: 'Branch ID : B04', photo: 'https://images.pexels.com/photos/29160881/pexels-photo-29160881/free-photo-of-trendy-urban-streetwear-look-with-headphones.jpeg' },
  ];

  const admin = [
    { name: 'Admin 1', username: '@admin1', details: 'Admin Main Branch', photo: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c65f5d26-dea9-45d9-b0ef-f70dda50f42d/dgu8bfz-56a9743f-53be-40c7-a1d1-caf701adce64.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2M2NWY1ZDI2LWRlYTktNDVkOS1iMGVmLWY3MGRkYTUwZjQyZFwvZGd1OGJmei01NmE5NzQzZi01M2JlLTQwYzctYTFkMS1jYWY3MDFhZGNlNjQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.AR0gybUgTc5pSls9-GAZW6IXjshxVPgtyy_KNND57Mw' }
  ];
  
  const drivers = [
    { name: 'Driver 1', username: '@driver1', details: 'Senior Driver', photo: 'https://images.pexels.com/photos/29152634/pexels-photo-29152634/free-photo-of-young-man-enjoying-christmas-festivities-in-vietnam.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Driver 2', username: '@driver2', details: 'Junior Driver', photo: 'https://images.pexels.com/photos/29061383/pexels-photo-29061383/free-photo-of-smiling-man-with-dreadlocks-holding-camera-outdoors.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Driver 3', username: '@driver3', details: 'Contract Driver', photo: 'https://images.pexels.com/photos/29132691/pexels-photo-29132691/free-photo-of-man-in-hoodie-exploring-nature-outdoors.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Driver 4', username: '@driver3', details: 'Contract Driver', photo: 'https://plus.unsplash.com/premium_photo-1669879825881-6d4e4bde67d5?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  ];
  
  const assistants = [
    { name: 'Assistant 1', username: '@assistant1', details: 'Driver Assistant', photo: 'https://plus.unsplash.com/premium_photo-1688891564708-9b2247085923?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Assistant 2', username: '@assistant2', details: 'Logistics Assistant', photo: 'https://preview.redd.it/created-random-people-using-chatgpt-midjourney-do-you-know-v0-q1aa450i5dqb1.png?width=1024&format=png&auto=webp&s=c4e9abc47d193474a2fa1a7e337d9d9340dce947' },
    { name: 'Assistant 3', username: '@assistant3', details: 'Operations Assistant', photo: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/570a1745898621.58408191aee7a.jpg' },
    { name: 'Assistant 4', username: '@assistant3', details: 'Operations Assistant', photo: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/c9cf6145898621.58408191af69f.jpg' },
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
          {/* Right Branch for Assistants */}
          <div className="absolute right-[-480px] top-8 w-80 h-0.5 bg-gray-400"></div>
          <div className="absolute right-[-480px] top-8 w-0.5 h-4 bg-gray-400"></div>
          {/* Left Branch for Drivers */}
          <div className="absolute left-[-480px] top-8 w-80 h-0.5 bg-gray-400"></div>
          <div className="absolute left-[-480px] top-8 w-0.5 h-4 bg-gray-400 "></div>
        </div>
      )}

      {/* Managers Level */}
      {showManagers && (
        <div className="flex flex-wrap justify-center gap-10 mt-3 relative ">
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





