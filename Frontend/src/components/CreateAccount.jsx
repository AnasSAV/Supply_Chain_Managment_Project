import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope, FaPhone } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  

  const handleCreateAccount = () => {
    // Add your account creation logic here
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert('Account created!');
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center font-roboto">
      {/* Background Image with Opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url("https://replydam.discoveryreplymedia.com/production/14/14/901bd07d-9c94-11d4-ea68-dd9111f80085/8bf29c37-f50c-4234-9aaf-bd14848f5365.jpg")',
        }}
      />
      {/* Overlay with Opacity */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      {/* Company Logo and Name */}
      <div className="relative z-10 mb-6 flex items-center text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="50"
          height="50"
          viewBox="0 0 30 30"
          fill="#ffffff"
          className="mr-3"
        >
          <path d="M20.752 10.993c0-.17-.05-.33-.13-.48l-2.77-5.02c-.46-.91-1.37-1.48-2.4-1.5-1.04-.02-1.98.54-2.44 1.4l-3.04 5.09c-.1.15-.15.33-.15.51h2.19 7H20.752zM14.752 6.373c.19-.35.53-.38.67-.38.13 0 .47.05.64.4.01.01.02.03.03.04l1.41 2.56h-4.31L14.752 6.373zM27.192 22.763l-1.54-2.77h-21.1l-1.62 2.71c-.8 1.5.31 3.29 2.04 3.29h20.14C26.812 25.993 27.922 24.263 27.192 22.763zM5.752 17.993L24.552 17.993 21.782 12.993 8.742 12.993z"></path>
        </svg>
        <h1 className="text-3xl font-bold text-white">CompanyA</h1>
      </div>

      {/* Create Account Form */}
      <div className="relative z-10 bg-white bg-opacity-60 p-8 rounded-lg shadow-lg w-128 transition duration-300 ease-in-out transform hover:scale-105">
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-700">Create Account</h2>
        <p className="text-sm font-medium text-center mb-6 text-gray-400">Select Your Role and Create an Account</p>

        {/* Role Dropdown */}
        <div className="mb-4 flex justify-end w-25">
          <select
            className="p-2 border border-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 text-sm transition duration-300 ease-in-out w-full"
            onChange={(e) => setRole(e.target.value)}
            value={role}
          >
            <option value="">Role</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
            <option value="Driver">Driver</option>
            <option value="Assistant">Assistant</option>
            <option value="Customer">Customer</option>
          </select>
        </div>

        {/* Username, Email, and Phone Number Fields */}
        <div className="flex justify-between mb-4">
          <div className="relative w-1/3 mr-2">
            <FaUser className="absolute left-3 top-5 text-gray-400" />
            <input
              type="text"
              placeholder="Username"
              className="w-full pt-3 pb-3 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="relative w-1/3 mx-2">
            <FaEnvelope className="absolute left-3 top-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pt-3 pb-3 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative w-1/3 ml-2">
            <FaPhone className="absolute left-3 top-5 text-gray-400" />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full pt-3 pb-3 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        {/* Password and Confirm Password Fields */}
        <div className="flex justify-between mb-4">
          <div className="relative w-1/2 mr-2">
            <FaLock className="absolute left-3 top-5 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pt-3 pb-3 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="relative w-1/2 ml-2">
            <FaLock className="absolute left-3 top-5 text-gray-400" />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full pt-3 pb-3 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Create Account Button */}
        <button
          className="w-full bg-gradient-to-br from-blue-overlay via-rebecca-purple to-orange-overlay bg-rebecca-purple text-white p-3 rounded hover:opacity-95 transition duration-400 ease-in-out"
          onClick={handleCreateAccount}
        >
          Create Account
        </button>

        <p className="text-center mt-4 text-gray-600">
            Already have an account?{' '}
            <span 
            className="text-blue-500 cursor-pointer hover:underline" 
            onClick={() => navigate('/login')}
            >
            Login
            </span>
        </p>
      </div>


    </div>
  );
};

export default CreateAccount;



