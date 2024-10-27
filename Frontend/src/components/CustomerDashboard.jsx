import React, { useEffect, useContext, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'; 
import { AuthContext } from '../contexts/AuthContext';
import { AiFillDashboard } from "react-icons/ai";
import { FaYandex, FaTruck } from 'react-icons/fa';
import Shop, { orders } from '../pages/Customer/Shop'; 

const CustomerDashboard = () => {
  const location = useLocation(); 
  const isActive = (path) => location.pathname === path;
  const { user, logout } = useContext(AuthContext); 
  const navigate = useNavigate(); 


  const handleLogout = () => {
    logout(); 
    navigate('/login'); 
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  
  useEffect(() => {
    if (location.pathname === '/dashboard') {
      console.log("Dashboard loaded"); 
    }
  }, [location.pathname]); 

  return (
    <div className="flex min-h-screen font-roboto">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-tr from-emerald-500 via-cyan-700 to-blue-500 shadow-xl rounded-r-xl">
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
            src="https://cdn.bestmovie.it/wp-content/uploads/2024/03/sydney-sweeney.jpg"
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
                  src="https://cdn.bestmovie.it/wp-content/uploads/2024/03/sydney-sweeney.jpg"
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
               
                <div className="mt-6">
                  <button
                    className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
                    onClick={closeModal} 
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
          <h3 className="mx-6 mb-3 text-xs text-gray-300 uppercase tracking-widest">Customer</h3>
          <Link
            to="/dashboard"
            className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${
              isActive('/dashboard')
                ? 'bg-gradient-to-tr from-teal-900  to-slate-700 text-white'
                : 'text-gray-200 hover:bg-orange-100 hover:text-black'
            }`}
            style={{ textDecoration: 'none' }}
          >
            <AiFillDashboard className="h-5 w-5 mr-3" />
            Dashboard
          </Link>

          <Link
            to="/customer/shop"
            className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${
              isActive('/customer/shop')
                ? 'bg-gradient-to-tr from-teal-900  to-slate-700 text-white'
                : 'text-gray-200 hover:bg-orange-100 hover:text-black'
            }`}
            style={{ textDecoration: 'none' }}
          >
            <FaYandex className="h-5 w-5 mr-3" />
            Shop
          </Link>

          <Link
            to="/customer/orders"
            className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${
              isActive('/customer/orders')
                ? 'bg-gradient-to-tr from-teal-900  to-slate-700 text-white'
                : 'text-gray-200 hover:bg-orange-100 hover:text-black'
            }`}
            style={{ textDecoration: 'none' }}
          >
            <FaTruck className="h-5 w-5 mr-3" />
            Orders
          </Link>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between py-3 px-6 bg-gray-50 border-b space-x-6">
          <form action="" className="w-full max-w-md">
            {/* Search form can go here */}
          </form>
        </div>

        {/* Main Content Area */}
        <div className="p-6 pt-0">
          {/* Conditionally render dashboard content based on the current path */}
          {location.pathname === '/dashboard' && (
            <section className="p-3 sm:p-10 space-y-3">
              <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
                <div className="mr-6">
                  <h2 className="text-2xl font-semibold mb-2">Dashboard</h2>
                  <h2 className="text-xl text-gray-600 ml-0.5">Overview</h2>
                </div>
              </div>
              {/* Dashboard Content*/}
              <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                <div className="flex items-center p-8 bg-white shadow rounded-2xl">
                  <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.353-1.855M7 20a3 3 0 00-3 3v1h12v-1a3 3 0 00-3-3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Total Orders</h3>
                    <p className="text-gray-500">120</p>
                  </div>
                </div>

                <div className="flex items-center p-8 bg-white shadow rounded-2xl">
                  <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Pending Orders</h3>
                    <p className="text-gray-500">12</p>
                  </div>
                </div>

                <div className="flex items-center p-8 bg-white shadow rounded-2xl">
                  <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-yellow-600 bg-yellow-100 rounded-full mr-6">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 12l2.25 2.25L15 12m0 0l-2.25-2.25L9.75 12m5.25 0h-9" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Completed Orders</h3>
                    <p className="text-gray-500">108</p>
                  </div>
                </div>

                <div className="flex items-center p-8 bg-white shadow rounded-2xl">
                  <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Canceled Orders</h3>
                    <p className="text-gray-500">8</p>
                  </div>
                </div>
              </section>
              <section className="grid xl:grid-cols-1 gap-6">
                <div className="flex flex-col p-10 bg-white shadow rounded-2xl">
                  <div>
                    <h3 className="text-md font-semibold">Shop Items</h3>
                    <p className="text-gray-500">Click to Order</p>
                  </div>
                  {/* Wrapper for the Shop items */}
                  <div className="flex overflow-x-auto space-x-2 p-0">
                    {/* Display only 2 items in the Shop component */}
                    {orders.slice(0, 4).map((order) => (
                      <Link
                        key={order.id}
                        to={`/customer/orders/${order.id}`}
                        className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-90 hover:shadow-xl"
                      >
                      <div key={order.id} className="flex-shrink-0 w-64 p-4 rounded-lg">
                        <img src={order.imgSrc} alt={order.products} className="w-full h-32 object-cover mb-2" />
                        <span className="text-gray-400 mr-3 uppercase text-xs">Order #{order.id}</span>
                        <h4 className="text-lg font-semibold mb-1">{order.products}</h4>
                        <p className="text-gray-500">{order.date}</p>
                      </div>
                      </Link>
                    ))}
                  </div>

                  {/* See More Link positioned at the bottom of the section */}
                  <div className="mt-6 text-center w-full">
                    <Link to="/customer/shop" className="text-blue-600 font-semibold hover:underline">
                      See More
                    </Link>
                  </div>
                </div>
              </section>






            </section>
          )}
          <Outlet /> 
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;

