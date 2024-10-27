import React, { useEffect, useContext, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import Orders from '../pages/Admin/Orders';
import { AuthContext } from '../contexts/AuthContext';
import { FaChartBar, FaTruck, FaUsers, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AiFillDashboard } from "react-icons/ai";
import { SiGoogleanalytics } from "react-icons/si";

// Sample Analytics Data
const analyticsData = {
  managerLogins: 34,
  managerOnline: 5,
  homePageViews: 1234,
  uniqueVisitors: 678,
};

const chartData = [
  { name: 'A', value: 400 },
  { name: 'B', value: 300 },
  { name: 'C', value: 200 },
  { name: 'D', value: 278 },
  { name: 'E', value: 189 },
  { name: 'F', value: 400 },
  { name: 'G', value: 300 },
  { name: 'H', value: 200 },
  { name: 'I', value: 278 },
];



const AdminDashboard = () => {
  const location = useLocation(); // To get the current route
  const isActive = (path) => location.pathname === path;
  const { user, logout } = useContext(AuthContext); // Assuming you have a logout function in AuthContext
  const navigate = useNavigate(); // For navigating to login page

  // Set chart width and height conditionally based on the route
  const chartWidth = location.pathname === '/dashboard' ? 350 : 800;
  const chartHeight = location.pathname === '/dashboard' ? 200 : 300;

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate('/login'); // Navigate to the login page
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!user) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [user]);

  return (
    <div className="flex min-h-screen bg-gray-100 font-roboto">
      {/* Sidebar */}
      <div className="w-64 bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900 shadow-xl rounded-r-xl">
        <div className="py-6 px-6 flex items-center justify-center">
          <Link to="/" className="flex items-center" style={{ textDecoration: 'none' }}>
            <h2 className="text-2xl font-semibold text-white ml-1">CompanyA</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="40"
              height="40"
              viewBox="0 0 30 30"
              fill="#ffffff"
              className="ml-3"
            >
              <path d="M20.752 10.993c0-.17-.05-.33-.13-.48l-2.77-5.02c-.46-.91-1.37-1.48-2.4-1.5-1.04-.02-1.98.54-2.44 1.4l-3.04 5.09c-.1.15-.15.33-.15.51h2.19 7H20.752zM14.752 6.373c.19-.35.53-.38.67-.38.13 0 .47.05.64.4.01.01.02.03.03.04l1.41 2.56h-4.31L14.752 6.373zM27.192 22.763l-1.54-2.77h-21.1l-1.62 2.71c-.8 1.5.31 3.29 2.04 3.29h20.14C26.812 25.993 27.922 24.263 27.192 22.763zM5.752 17.993L24.552 17.993 21.782 12.993 8.742 12.993z"></path>
            </svg>
          </Link>
        </div>
        <div className="flex items-center px-6 py-4 text-gray-200 mb-0 mt-6">
          <img
            className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 cursor-pointer"
            src="https://img.freepik.com/premium-photo/young-woman-posing-wheat-field_128831-549.jpg"
            alt="Bordered avatar"
            onClick={openModal} 
          />
          <div className="ml-4">
            <p className="mb-0 font-semibold text-white cursor-pointer" onClick={openModal} >{user.username}</p>
            <p className="mb-1 text-sm text-gray-300 cursor-pointer" onClick={openModal} >{user.role}</p>
          </div>
        </div>

        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          >
            <div className="relative bg-white p-20 rounded-2xl shadow-lg flex space-x-10">
              {/* Profile Photo */}
              <div className="relative">
                <img
                  className="w-96 h-96 rounded-full object-cover"
                  src="https://img.freepik.com/premium-photo/young-woman-posing-wheat-field_128831-549.jpg"
                  alt="Enlarged avatar"
                />

              </div>

              {/* Profile Details */}
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Profile Details</h2>
                <p className="text-lg text-gray-600">
                  <span className="font-bold">Username: </span>{user.username}
                </p>
                <p className="text-lg text-gray-600">
                  <span className="font-bold">Email: </span>{user.email}
                </p>
                <p className="text-lg text-gray-600">
                  <span className="font-bold">Role: </span>{user.role}
                </p>
                {/* You can add more details here */}
                <div className="mt-6">
                  <button
                    className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
                    onClick={closeModal} // Close modal on button click
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}


        <div className="px-5 mb-5 mt-0">
          <button
            onClick={handleLogout}
            className="w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-xs px-5 py-1.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Logout
          </button>
        </div>

        <div className="mb-10">
          <h3 className="mx-6 mb-3 text-xs text-gray-300 uppercase tracking-widest">Admin</h3>
          <Link
            to="/admin"
            className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${
              isActive('/admin')
                ? 'bg-gradient-to-tr from-cyan-500  to-blue-500 text-white'
                : 'text-gray-200 hover:bg-orange-100 hover:text-black'
            }`}
            style={{ textDecoration: 'none' }}
          >
            <AiFillDashboard className="h-5 w-5 mr-3" />
            Dashboard
          </Link>

          <Link
            to="/admin/orders"
            className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${
              isActive('/admin/orders')
                ? 'bg-gradient-to-tr from-cyan-500  to-blue-500 text-white'
                : 'text-gray-200 hover:bg-orange-100 hover:text-black'
            }`}
            style={{ textDecoration: 'none' }}
          >
            <FaTruck className="h-5 w-5 mr-3" />
            Orders
          </Link>

          <Link
            to="/admin/analytics"
            className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${
              isActive('/admin/analytics')
                ? 'bg-gradient-to-tr from-cyan-500  to-blue-500 text-white'
                : 'text-gray-200 hover:bg-orange-100 hover:text-black'
            }`}
            style={{ textDecoration: 'none' }}
          >
            <SiGoogleanalytics className="h-5 w-5 mr-3" />
            Analytics
          </Link>

          <Link
            to="/admin/assignments"
            className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${
              isActive('/admin/assignments')
                ? 'bg-gradient-to-tr from-cyan-500  to-blue-500 text-white'
                : 'text-gray-200 hover:bg-orange-100 hover:text-black'
            }`}
            style={{ textDecoration: 'none' }}
          >
            <FaUsers className="h-5 w-5 mr-3" />
            Assignments
          </Link>

          <Link
            to="/admin/roster"
            className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${
              isActive('/admin/roster')
                ? 'bg-gradient-to-tr from-cyan-500  to-blue-500 text-white'
                : 'text-gray-200 hover:bg-orange-100 hover:text-black'
            }`}
            style={{ textDecoration: 'none' }}
          >
            <FaUsers className="h-5 w-5 mr-3" />
            Roster
          </Link>
        </div>
      </div>


{/* Main Content */}
<div className="flex-1 p-6">
  {/* <div className="flex justify-between py-3 px-6 bg-white border-b shadow-sm">
    <h2 className="text-2xl font-bold">Admin Panel</h2>
    <div className="flex items-center space-x-4"> */}
      {/* Future Search or User Settings */}
    {/* </div>
  </div> */}

  {/* Conditionally render the dashboard content */}
  {location.pathname === '/admin' && (
    <div className="mt-6 grid grid-cols-4 gap-6">
      {/* Analytics Cards */}
      {/* Manager Logins Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
        <FaChartBar className="text-gray-700 text-3xl mb-3" />
        <h3 className="text-gray-700 text-lg font-semibold">Manager Logins</h3>
        <p className="text-gray-800 text-2xl mt-2">{analyticsData.managerLogins}</p>
      </div>

      {/* Managers Online Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
        <FaUsers className="text-gray-700 text-3xl mb-3" />
        <h3 className="text-gray-700 text-lg font-semibold">Managers Online</h3>
        <p className="text-gray-800 text-2xl mt-2">{analyticsData.managerOnline}</p>
      </div>

      {/* Home Page Views Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
        <FaEye className="text-gray-700 text-3xl mb-3" />
        <h3 className="text-gray-700 text-lg font-semibold">Home Page Views</h3>
        <p className="text-gray-800 text-2xl mt-2">{analyticsData.homePageViews}</p>
      </div>

      {/* Duplicate Home Page Views Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
        <FaEye className="text-gray-700 text-3xl mb-3" />
        <h3 className="text-gray-700 text-lg font-semibold">Home Page Views</h3>
        <p className="text-gray-800 text-2xl mt-2">{analyticsData.homePageViews}</p>
      </div>

      {/* Performance Chart */}
      <div className="col-span-2 bg-white shadow-md rounded-lg p-6 w-auto transform transition duration-300 hover:scale-105 hover:shadow-2xl">
        <h2 className="text-lg font-bold mb-4">Performance Chart</h2>
        <BarChart width={500} height={400} data={chartData}>
          <defs>
            <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#659BDF" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#87ceeb" stopOpacity={1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="url(#blueGradient)" />
        </BarChart>
      </div>

      {/* Recent Orders */}
      <div className="col-span-2 bg-white shadow-md rounded-lg p-6 w-full overflow-x-auto transform transition duration-300 hover:scale-105 hover:shadow-2xl">
        <h2 className="text-lg font-bold mb-1">Recent Orders</h2>
        <div className="overflow-hidden">
          <Orders limit={3} isAdmin={true} showDetails={true} /> {/* Adjust the Orders component as necessary */}
        </div>
        <Link to="/admin/orders" className="text-blue-600 hover:underline mt-4 block">
          See More
        </Link>
      </div>
    </div>
  )}

  {/* Render the page based on route using Outlet */}
  <Outlet />
</div>

    </div>
  );
};

export default AdminDashboard;












