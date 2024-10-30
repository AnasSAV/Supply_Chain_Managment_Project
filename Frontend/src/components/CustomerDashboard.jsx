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
    if (location.pathname === '/customer') {
      console.log("Dashboard loaded"); 
    }
  }, [location.pathname]); 

  return (
    <div className="flex min-h-screen font-roboto">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-tr from-emerald-500 via-cyan-700 to-blue-500 shadow-xl rounded-r-xl">
        <div className="py-6 px-6 flex items-center justify-center">
          <Link to="/" className="flex items-center" style={{ textDecoration: 'none' }}>
            <h2 className="text-2xl font-semibold text-white ml-1 mr-2 mt-1">PathS</h2>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50" fill='#ffff'>
                <path d="M36,4H14C8.477,4,4,8.477,4,14v22c0,5.523,4.477,10,10,10h22c5.523,0,10-4.477,10-10V14C46,8.477,41.523,4,36,4z M14.869,39.252c-0.84-0.587-6.333-4.256-6.333-4.256l4.116-5.04l2.559,1.827c0.951,1.536,2.298,3.699,2.931,4.649 c0.632,0.948,0.931,2.78,0.985,3.346l0.073,0.759C17.964,40.778,16.399,40.312,14.869,39.252z M24.664,35.752L20.8,39.616 c0,0-0.252-2.605-1.26-4.116c-1.008-1.511-3.948-6.3-3.948-6.3c-1.26-2.016-1.428-4.032-0.42-5.04l3.36-3.36 c0,0,0.756,1.848,1.764,3.528c1.092,1.764,3.948,6.384,3.948,6.384C25.504,32.728,25.672,34.744,24.664,35.752z M25.927,28.78 c0,0-0.569-0.307-1.357-0.736c-0.925-1.496-2.196-3.552-2.846-4.601c-0.914-1.524-1.63-3.263-1.638-3.28l-0.148-0.36 c1.026-0.236,2.423,0.327,3.972,1.295c0.03,0,0.54,0.283,1.242,0.685c0.953,1.541,2.34,3.768,2.985,4.737 c0.854,1.353,1.473,3.258,1.478,3.277l0.07,0.218C28.621,30.104,27.258,29.668,25.927,28.78z M34.66,25.84l-3.444,3.444 c0,0-0.673-2.1-1.68-3.695c-1.008-1.512-3.948-6.3-3.948-6.3c-1.26-2.016-1.428-4.032-0.42-5.04l3.864-3.864 c0,0,0.252,2.352,1.26,4.032C31.384,16.18,34.24,20.8,34.24,20.8C35.5,22.816,35.668,24.832,34.66,25.84z M37.516,19.96 l-3.213-2.252l-2.583-4.176c-0.65-1.085-0.957-2.773-1.018-3.33l-0.114-1.029c1.244-0.44,2.973-0.004,4.656,1.291 c0.84,0.589,6.388,4.456,6.388,4.456L37.516,19.96z"></path>
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
            to="/customer"
            className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${
              isActive('/customer')
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
          {location.pathname === '/customer' && (
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
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                  <path d="M 10 7 C 6.1463017 7 3 10.146302 3 14 C 3 17.853698 6.1463017 21 10 21 C 13.853698 21 17 17.853698 17 14 C 17 10.146302 13.853698 7 10 7 z M 36 7 L 36 9 L 43.740234 9 L 35.964844 17.550781 L 32 13.585938 L 21 24.585938 L 17.027344 20.613281 L 3.3222656 33.265625 L 4.6777344 34.734375 L 16.972656 23.386719 L 21 27.414062 L 32 16.414062 L 36.035156 20.449219 L 45 10.585938 L 45 18 L 47 18 L 47 7 L 36 7 z M 10 9 C 12.772302 9 15 11.227698 15 14 C 15 16.772302 12.772302 19 10 19 C 7.2276983 19 5 16.772302 5 14 C 5 11.227698 7.2276983 9 10 9 z M 9.4902344 11.283203 L 7.6796875 13.09375 L 9.09375 13.09375 L 9.09375 16.716797 L 10.90625 16.716797 L 10.90625 11.283203 L 9.4902344 11.283203 z M 39 20 L 39 44 L 41 44 L 41 20 L 39 20 z M 45 22 L 45 44 L 47 44 L 47 22 L 45 22 z M 27 25 L 27 44 L 29 44 L 29 25 L 27 25 z M 33 25 L 33 44 L 35 44 L 35 25 L 33 25 z M 15 30 L 15 44 L 17 44 L 17 30 L 15 30 z M 21 31 L 21 44 L 23 44 L 23 31 L 21 31 z M 9 35 L 9 44 L 11 44 L 11 35 L 9 35 z M 3 39 L 3 44 L 5 44 L 5 39 L 3 39 z"></path>
                  </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Total Orders</h3>
                    <p className="text-gray-500">120</p>
                  </div>
                </div>

                <div className="flex items-center p-8 bg-white shadow rounded-2xl">
                  <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 80 80">
    <path d="M 18.519531 10 L 10 20.648438 L 10 70 L 70 70 L 70 69 L 70 20.648438 L 61.480469 10 L 18.519531 10 z M 19.480469 12 L 60.519531 12 L 66.917969 20 L 45 20 L 45 21 C 45 23.773666 42.773666 26 40 26 C 37.226334 26 35 23.773666 35 21 L 35 20 L 13.082031 20 L 19.480469 12 z M 12 22 L 33.203125 22 C 33.709475 25.363146 36.49988 28 40 28 C 43.50012 28 46.290525 25.363146 46.796875 22 L 68 22 L 68 68 L 12 68 L 12 22 z M 40 32 C 32.832143 32 27 37.832143 27 45 C 27 52.167857 32.832143 58 40 58 C 47.167857 58 53 52.167857 53 45 C 53 37.832143 47.167857 32 40 32 z M 40 34 C 46.086977 34 51 38.913023 51 45 C 51 51.086977 46.086977 56 40 56 C 33.913023 56 29 51.086977 29 45 C 29 38.913023 33.913023 34 40 34 z M 39.984375 35.986328 A 1.0001 1.0001 0 0 0 39 37 L 39 44.5 L 35.400391 47.199219 A 1.0003905 1.0003905 0 1 0 36.599609 48.800781 L 41 45.5 L 41 37 A 1.0001 1.0001 0 0 0 39.984375 35.986328 z M 18 63 A 1 1 0 0 0 17 64 A 1 1 0 0 0 18 65 A 1 1 0 0 0 19 64 A 1 1 0 0 0 18 63 z M 22 63 A 1 1 0 0 0 21 64 A 1 1 0 0 0 22 65 A 1 1 0 0 0 23 64 A 1 1 0 0 0 22 63 z M 26 63 A 1 1 0 0 0 25 64 A 1 1 0 0 0 26 65 A 1 1 0 0 0 27 64 A 1 1 0 0 0 26 63 z M 30 63 A 1 1 0 0 0 29 64 A 1 1 0 0 0 30 65 A 1 1 0 0 0 31 64 A 1 1 0 0 0 30 63 z M 34 63 A 1 1 0 0 0 33 64 A 1 1 0 0 0 34 65 A 1 1 0 0 0 35 64 A 1 1 0 0 0 34 63 z M 38 63 A 1 1 0 0 0 37 64 A 1 1 0 0 0 38 65 A 1 1 0 0 0 39 64 A 1 1 0 0 0 38 63 z M 42 63 A 1 1 0 0 0 41 64 A 1 1 0 0 0 42 65 A 1 1 0 0 0 43 64 A 1 1 0 0 0 42 63 z M 46 63 A 1 1 0 0 0 45 64 A 1 1 0 0 0 46 65 A 1 1 0 0 0 47 64 A 1 1 0 0 0 46 63 z M 50 63 A 1 1 0 0 0 49 64 A 1 1 0 0 0 50 65 A 1 1 0 0 0 51 64 A 1 1 0 0 0 50 63 z M 54 63 A 1 1 0 0 0 53 64 A 1 1 0 0 0 54 65 A 1 1 0 0 0 55 64 A 1 1 0 0 0 54 63 z M 58 63 A 1 1 0 0 0 57 64 A 1 1 0 0 0 58 65 A 1 1 0 0 0 59 64 A 1 1 0 0 0 58 63 z M 62 63 A 1 1 0 0 0 61 64 A 1 1 0 0 0 62 65 A 1 1 0 0 0 63 64 A 1 1 0 0 0 62 63 z"></path>
</svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Pending Orders</h3>
                    <p className="text-gray-500">12</p>
                  </div>
                </div>

                <div className="flex items-center p-8 bg-white shadow rounded-2xl">
                  <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-yellow-600 bg-yellow-100 rounded-full mr-6">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 80 80">
<path d="M 0 9 L 0 52 L 3 52 L 3 65 L 8.058594 65 C 8.558594 69.488281 12.378906 73 17 73 C 21.621094 73 25.441406 69.488281 25.941406 65 L 50.058594 65 C 50.558594 69.488281 54.378906 73 59 73 C 63.621094 73 67.441406 69.488281 67.941406 65 L 78 65 C 79.09375 65 80 64.09375 80 63 L 80 59 C 80 58.292969 79.5625 57.773438 79 57.417969 L 79 43.546875 L 72.414063 26.480469 C 71.375 23.785156 68.773438 22 65.886719 22 L 47 22 L 47 9 Z M 2 11 L 45 11 L 45 50 C 44.449219 50 44 50.449219 44 51 C 44 51.550781 44.449219 52 45 52 L 45 63 L 25.941406 63 C 25.441406 58.511719 21.621094 55 17 55 C 12.378906 55 8.558594 58.511719 8.058594 63 L 5 63 L 5 52 C 5.550781 52 6 51.550781 6 51 C 6 50.449219 5.550781 50 5 50 L 2 50 Z M 35.144531 22.375 L 20.453125 36.542969 L 13 28.898438 L 10.851563 30.992188 L 20.386719 40.769531 L 37.226563 24.535156 Z M 47 24 L 61 24 L 61 38 C 61 40.199219 62.800781 42 65 42 L 66.394531 42 C 67.066406 42 67.6875 42.332031 68.058594 42.890625 L 68.277344 43.21875 C 69.019531 44.332031 70.269531 45 71.605469 45 L 77 45 L 77 47 L 75 47 C 72.800781 47 71 48.800781 71 51 L 71 52 L 71.203125 52 C 71.660156 53.707031 73.15625 55 75 55 L 77 55 L 77 57 C 76.449219 57 76 57.449219 76 58 C 76 58.550781 76.449219 59 77 59 L 78 59 L 78 63 L 67.941406 63 C 67.441406 58.511719 63.621094 55 59 55 C 54.378906 55 50.558594 58.511719 50.058594 63 L 47 63 Z M 63 24 L 65.886719 24 C 67.953125 24 69.804688 25.269531 70.546875 27.199219 L 76.644531 43 L 71.605469 43 C 70.933594 43 70.3125 42.667969 69.941406 42.109375 L 69.71875 41.78125 C 68.980469 40.667969 67.730469 40 66.394531 40 L 65 40 C 63.882813 40 63 39.117188 63 38 Z M 53 27 C 51.355469 27 50 28.355469 50 30 L 50 39 C 50 40.644531 51.355469 42 53 42 L 55 42 C 56.644531 42 58 40.644531 58 39 L 58 30 C 58 28.355469 56.644531 27 55 27 Z M 53 29 L 55 29 C 55.566406 29 56 29.433594 56 30 L 56 39 C 56 39.566406 55.566406 40 55 40 L 53 40 C 52.433594 40 52 39.566406 52 39 L 52 30 C 52 29.433594 52.433594 29 53 29 Z M 75 49 L 77 49 L 77 53 L 75 53 C 73.882813 53 73 52.117188 73 51 C 73 49.882813 73.882813 49 75 49 Z M 9 50 C 8.449219 50 8 50.449219 8 51 C 8 51.550781 8.449219 52 9 52 C 9.550781 52 10 51.550781 10 51 C 10 50.449219 9.550781 50 9 50 Z M 13 50 C 12.449219 50 12 50.449219 12 51 C 12 51.550781 12.449219 52 13 52 C 13.550781 52 14 51.550781 14 51 C 14 50.449219 13.550781 50 13 50 Z M 17 50 C 16.449219 50 16 50.449219 16 51 C 16 51.550781 16.449219 52 17 52 C 17.550781 52 18 51.550781 18 51 C 18 50.449219 17.550781 50 17 50 Z M 21 50 C 20.449219 50 20 50.449219 20 51 C 20 51.550781 20.449219 52 21 52 C 21.550781 52 22 51.550781 22 51 C 22 50.449219 21.550781 50 21 50 Z M 25 50 C 24.449219 50 24 50.449219 24 51 C 24 51.550781 24.449219 52 25 52 C 25.550781 52 26 51.550781 26 51 C 26 50.449219 25.550781 50 25 50 Z M 29 50 C 28.449219 50 28 50.449219 28 51 C 28 51.550781 28.449219 52 29 52 C 29.550781 52 30 51.550781 30 51 C 30 50.449219 29.550781 50 29 50 Z M 33 50 C 32.449219 50 32 50.449219 32 51 C 32 51.550781 32.449219 52 33 52 C 33.550781 52 34 51.550781 34 51 C 34 50.449219 33.550781 50 33 50 Z M 37 50 C 36.449219 50 36 50.449219 36 51 C 36 51.550781 36.449219 52 37 52 C 37.550781 52 38 51.550781 38 51 C 38 50.449219 37.550781 50 37 50 Z M 41 50 C 40.449219 50 40 50.449219 40 51 C 40 51.550781 40.449219 52 41 52 C 41.550781 52 42 51.550781 42 51 C 42 50.449219 41.550781 50 41 50 Z M 17 57 C 20.878906 57 24 60.121094 24 64 C 24 67.878906 20.878906 71 17 71 C 13.121094 71 10 67.878906 10 64 C 10 60.121094 13.121094 57 17 57 Z M 59 57 C 62.878906 57 66 60.121094 66 64 C 66 67.878906 62.878906 71 59 71 C 55.121094 71 52 67.878906 52 64 C 52 60.121094 55.121094 57 59 57 Z M 69 57 C 68.449219 57 68 57.449219 68 58 C 68 58.550781 68.449219 59 69 59 C 69.550781 59 70 58.550781 70 58 C 70 57.449219 69.550781 57 69 57 Z M 73 57 C 72.449219 57 72 57.449219 72 58 C 72 58.550781 72.449219 59 73 59 C 73.550781 59 74 58.550781 74 58 C 74 57.449219 73.550781 57 73 57 Z M 17 61 C 15.355469 61 14 62.355469 14 64 C 14 65.644531 15.355469 67 17 67 C 18.644531 67 20 65.644531 20 64 C 20 62.355469 18.644531 61 17 61 Z M 59 61 C 57.355469 61 56 62.355469 56 64 C 56 65.644531 57.355469 67 59 67 C 60.644531 67 62 65.644531 62 64 C 62 62.355469 60.644531 61 59 61 Z M 17 63 C 17.5625 63 18 63.4375 18 64 C 18 64.5625 17.5625 65 17 65 C 16.4375 65 16 64.5625 16 64 C 16 63.4375 16.4375 63 17 63 Z M 59 63 C 59.5625 63 60 63.4375 60 64 C 60 64.5625 59.5625 65 59 65 C 58.4375 65 58 64.5625 58 64 C 58 63.4375 58.4375 63 59 63 Z"></path>
</svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Shipped Orders</h3>
                    <p className="text-gray-500">108</p>
                  </div>
                </div>

                <div className="flex items-center p-8 bg-white shadow rounded-2xl">
                  <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 80 80">
<path d="M 19 7 C 17.355469 7 16 8.355469 16 10 L 16 21 L 14 21 C 12.355469 21 11 22.355469 11 24 L 11 30 C 11 31.644531 12.355469 33 14 33 L 16 33 L 16 34.203125 C 13.191406 34.699219 11 37.050781 11 40 L 11 58.417969 C 9.894531 58.859375 9 59.742188 9 61 L 9 65 C 9 66.644531 10.355469 68 12 68 L 12 71 C 12 72.09375 12.90625 73 14 73 L 22 73 C 23.09375 73 24 72.09375 24 71 L 24 68 L 48.527344 68 C 50.308594 74.890625 56.558594 80 64 80 C 72.824219 80 80 72.824219 80 64 C 80 56.921875 75.378906 50.914063 69 48.8125 L 69 40 C 69 37.050781 66.808594 34.699219 64 34.203125 L 64 33 L 66 33 C 67.644531 33 69 31.644531 69 30 L 69 24 C 69 22.355469 67.644531 21 66 21 L 64 21 L 64 10 C 64 8.355469 62.644531 7 61 7 L 58 7 L 58 14 L 56.71875 14 L 55.40625 10.050781 C 54.996094 8.832031 53.847656 8 52.558594 8 L 27.441406 8 C 26.152344 8 25.003906 8.832031 24.59375 10.050781 L 23.28125 14 L 22 14 L 22 7 Z M 19 9 L 20 9 L 20 14.351563 C 19.253906 14.617188 18.578125 15.027344 18 15.546875 L 18 10 C 18 9.433594 18.433594 9 19 9 Z M 60 9 L 61 9 C 61.566406 9 62 9.433594 62 10 L 62 15.546875 C 61.421875 15.027344 60.746094 14.617188 60 14.351563 Z M 27.441406 10 L 52.558594 10 C 52.992188 10 53.371094 10.269531 53.507813 10.683594 L 54.613281 14 L 25.386719 14 L 26.492188 10.683594 C 26.628906 10.273438 27.007813 10 27.441406 10 Z M 32 11 C 31.449219 11 31 11.449219 31 12 C 31 12.550781 31.449219 13 32 13 C 32.550781 13 33 12.550781 33 12 C 33 11.449219 32.550781 11 32 11 Z M 36 11 C 35.449219 11 35 11.449219 35 12 C 35 12.550781 35.449219 13 36 13 C 36.550781 13 37 12.550781 37 12 C 37 11.449219 36.550781 11 36 11 Z M 40 11 C 39.449219 11 39 11.449219 39 12 C 39 12.550781 39.449219 13 40 13 C 40.550781 13 41 12.550781 41 12 C 41 11.449219 40.550781 11 40 11 Z M 44 11 C 43.449219 11 43 11.449219 43 12 C 43 12.550781 43.449219 13 44 13 C 44.550781 13 45 12.550781 45 12 C 45 11.449219 44.550781 11 44 11 Z M 48 11 C 47.449219 11 47 11.449219 47 12 C 47 12.550781 47.449219 13 48 13 C 48.550781 13 49 12.550781 49 12 C 49 11.449219 48.550781 11 48 11 Z M 22 16 L 39 16 C 39 16.550781 39.449219 17 40 17 C 40.550781 17 41 16.550781 41 16 L 58 16 C 60.21875 16 62 17.78125 62 20 L 62 23 L 66 23 C 66.566406 23 67 23.433594 67 24 L 67 30 C 67 30.566406 66.566406 31 66 31 L 62 31 L 62 34.382813 L 58.765625 36 L 41 36 C 41 35.449219 40.550781 35 40 35 C 39.449219 35 39 35.449219 39 36 L 21.234375 36 L 18 34.382813 L 18 31 L 14 31 C 13.433594 31 13 30.566406 13 30 L 13 24 C 13 23.433594 13.433594 23 14 23 L 18 23 L 18 20 C 18 17.78125 19.78125 16 22 16 Z M 40 19 C 39.449219 19 39 19.449219 39 20 C 39 20.550781 39.449219 21 40 21 C 40.550781 21 41 20.550781 41 20 C 41 19.449219 40.550781 19 40 19 Z M 40 23 C 39.449219 23 39 23.449219 39 24 C 39 24.550781 39.449219 25 40 25 C 40.550781 25 41 24.550781 41 24 C 41 23.449219 40.550781 23 40 23 Z M 17 24 C 16.449219 24 16 24.449219 16 25 C 16 25.550781 16.449219 26 17 26 C 17.550781 26 18 25.550781 18 25 C 18 24.449219 17.550781 24 17 24 Z M 63 24 C 62.449219 24 62 24.449219 62 25 C 62 25.550781 62.449219 26 63 26 C 63.550781 26 64 25.550781 64 25 C 64 24.449219 63.550781 24 63 24 Z M 40 27 C 39.449219 27 39 27.449219 39 28 C 39 28.550781 39.449219 29 40 29 C 40.550781 29 41 28.550781 41 28 C 41 27.449219 40.550781 27 40 27 Z M 17 28 C 16.449219 28 16 28.449219 16 29 C 16 29.550781 16.449219 30 17 30 C 17.550781 30 18 29.550781 18 29 C 18 28.449219 17.550781 28 17 28 Z M 63 28 C 62.449219 28 62 28.449219 62 29 C 62 29.550781 62.449219 30 63 30 C 63.550781 30 64 29.550781 64 29 C 64 28.449219 63.550781 28 63 28 Z M 40 31 C 39.449219 31 39 31.449219 39 32 C 39 32.550781 39.449219 33 40 33 C 40.550781 33 41 32.550781 41 32 C 41 31.449219 40.550781 31 40 31 Z M 16.800781 36.019531 L 20.765625 38 L 59.234375 38 L 63.199219 36.019531 C 65.324219 36.125 67 37.847656 67 40 L 67 48.292969 C 66.101563 48.121094 65.179688 48.027344 64.238281 48.011719 C 63.6875 47.394531 62.886719 47 62 47 L 58 47 C 56.355469 47 55 48.355469 55 50 L 55 50.789063 C 53.449219 51.851563 52.09375 53.179688 51 54.707031 L 51 49 C 51 47.355469 49.644531 46 48 46 L 32 46 C 30.355469 46 29 47.355469 29 49 L 29 59 C 29 59.550781 29.449219 60 30 60 C 30.550781 60 31 59.550781 31 59 L 31 49 C 31 48.433594 31.433594 48 32 48 L 48 48 C 48.566406 48 49 48.433594 49 49 L 49 58.484375 C 48.363281 60.207031 48 62.058594 48 64 C 48 64.679688 48.054688 65.34375 48.140625 66 L 22 66 L 22 71 L 14 71 L 14 66 L 12 66 C 11.433594 66 11 65.566406 11 65 L 11 61 C 11 60.433594 11.433594 60 12 60 L 13 60 L 13 40 C 13 37.847656 14.675781 36.125 16.800781 36.019531 Z M 13 59 C 13 59.550781 13.449219 60 14 60 C 14.550781 60 15 59.550781 15 59 C 15 58.449219 14.550781 58 14 58 C 13.449219 58 13 58.449219 13 59 Z M 18 47 C 16.355469 47 15 48.355469 15 50 L 15 51 C 15 52.644531 16.355469 54 18 54 L 22 54 C 23.644531 54 25 52.644531 25 51 L 25 50 C 25 48.355469 23.644531 47 22 47 Z M 18 49 L 22 49 C 22.566406 49 23 49.433594 23 50 L 23 51 C 23 51.566406 22.566406 52 22 52 L 18 52 C 17.433594 52 17 51.566406 17 51 L 17 50 C 17 49.433594 17.433594 49 18 49 Z M 58 49 L 58.449219 49 C 57.984375 49.171875 57.535156 49.367188 57.09375 49.582031 C 57.246094 49.234375 57.585938 49 58 49 Z M 33 50 L 33 52 L 47 52 L 47 50 Z M 64 50 C 71.742188 50 78 56.257813 78 64 C 78 71.742188 71.742188 78 64 78 C 56.257813 78 50 71.742188 50 64 C 50 62.234375 50.339844 60.554688 50.933594 59 L 51 59 L 51 58.8125 C 53.058594 53.644531 58.089844 50 64 50 Z M 33 54 L 33 56 L 47 56 L 47 54 Z M 18 58 C 17.449219 58 17 58.449219 17 59 C 17 59.550781 17.449219 60 18 60 C 18.550781 60 19 59.550781 19 59 C 19 58.449219 18.550781 58 18 58 Z M 22 58 C 21.449219 58 21 58.449219 21 59 C 21 59.550781 21.449219 60 22 60 C 22.550781 60 23 59.550781 23 59 C 23 58.449219 22.550781 58 22 58 Z M 26 58 C 25.449219 58 25 58.449219 25 59 C 25 59.550781 25.449219 60 26 60 C 26.550781 60 27 59.550781 27 59 C 27 58.449219 26.550781 58 26 58 Z M 34 58 C 33.449219 58 33 58.449219 33 59 C 33 59.550781 33.449219 60 34 60 C 34.550781 60 35 59.550781 35 59 C 35 58.449219 34.550781 58 34 58 Z M 38 58 C 37.449219 58 37 58.449219 37 59 C 37 59.550781 37.449219 60 38 60 C 38.550781 60 39 59.550781 39 59 C 39 58.449219 38.550781 58 38 58 Z M 42 58 C 41.449219 58 41 58.449219 41 59 C 41 59.550781 41.449219 60 42 60 C 42.550781 60 43 59.550781 43 59 C 43 58.449219 42.550781 58 42 58 Z M 46 58 C 45.449219 58 45 58.449219 45 59 C 45 59.550781 45.449219 60 46 60 C 46.550781 60 47 59.550781 47 59 C 47 58.449219 46.550781 58 46 58 Z M 70.78125 58.226563 L 61.285156 67.515625 L 57.640625 63.796875 L 56.210938 65.199219 L 61.253906 70.34375 L 72.175781 59.65625 Z M 16 66 C 15.449219 66 15 66.449219 15 67 C 15 67.550781 15.449219 68 16 68 C 16.550781 68 17 67.550781 17 67 C 17 66.449219 16.550781 66 16 66 Z M 20 66 C 19.449219 66 19 66.449219 19 67 C 19 67.550781 19.449219 68 20 68 C 20.550781 68 21 67.550781 21 67 C 21 66.449219 20.550781 66 20 66 Z"></path>
</svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Delivered Orders</h3>
                    <p className="text-gray-500">8</p>
                  </div>
                </div>
              </section>
              <section className="grid xl:grid-cols-1 gap-6">
                <div className="flex flex-col p-10 bg-white shadow rounded-2xl">
                  {/* <div>
                    <h3 className="text-md font-semibold">Shop Items</h3>
                    <p className="text-gray-500">Click to Order</p>
                  </div> */}
                  
                  {/* Wrapper for Shop items with a limit on display (no overflow scrolling) */}
                  <div className="flex space-x-3 p-0 overflow-x-visible">
                    {orders.slice(0, 1).map((order) => ( // Limits display to 2 items only
                      <Shop key={order.id} order={order} />
                    ))}
                  </div>

                  {/* See More Link positioned at the bottom */}
                  <div className="mt-6 text-center w-full">
                    <Link to="/customer/shop" className="text-blue-600 font-semibold hover:underline">
                      See More <span className="ml-1">&rarr;</span>
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

