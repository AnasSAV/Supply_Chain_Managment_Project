import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { FaUser, FaLock } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Predefined users for login simulation
const predefinedUsers = [
  { username: 'manager1', password: 'managerpass', role: 'Manager' },
  { username: 'manager2', password: 'managerpass', role: 'Manager' },
  { username: 'admin1', password: 'adminpass', role: 'Admin' },
  { username: 'driver1', password: 'driverpass', role: 'Driver' },
  { username: 'assistant1', password: 'assistantpass', role: 'Assistant' },
  { username: 'customer1', password: 'customerpass', role: 'Customer' },
];

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // For navigation

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password: password,
          role: role
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        const branch_id = data.branch_id;
        
        // Update AuthContext with user details including ID
        login(
          username,
          null,
          data.role,
          branch_id,
          data.id
        );

        // Navigate based on role
        switch (data.role) {
          case 'manager':
            navigate('/manager');
            break;
          case 'admin':
            navigate('/admin');
            break;
          case 'driver':
            navigate('/driver');
            break;
          case 'assistant':
            navigate('/assistant');
            break;
          case 'customer':
            navigate('/customer');
            break;
          default:
            navigate('/dashboard');
        }

        toast.success('Login successful!', {
          position: 'top-center',
        });
      } else {
        toast.error(data.message || 'Login failed. Please check your credentials.', {
          position: 'top-center',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login. Please try again.', {
        position: 'top-center',
      });
    }
  };

  return (
    <div className="relative font-roboto flex flex-col items-center justify-center min-h-screen bg-cover bg-center">
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
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50" fill='#ffff' className='mr-3 mb-2  '>
                <path d="M36,4H14C8.477,4,4,8.477,4,14v22c0,5.523,4.477,10,10,10h22c5.523,0,10-4.477,10-10V14C46,8.477,41.523,4,36,4z M14.869,39.252c-0.84-0.587-6.333-4.256-6.333-4.256l4.116-5.04l2.559,1.827c0.951,1.536,2.298,3.699,2.931,4.649 c0.632,0.948,0.931,2.78,0.985,3.346l0.073,0.759C17.964,40.778,16.399,40.312,14.869,39.252z M24.664,35.752L20.8,39.616 c0,0-0.252-2.605-1.26-4.116c-1.008-1.511-3.948-6.3-3.948-6.3c-1.26-2.016-1.428-4.032-0.42-5.04l3.36-3.36 c0,0,0.756,1.848,1.764,3.528c1.092,1.764,3.948,6.384,3.948,6.384C25.504,32.728,25.672,34.744,24.664,35.752z M25.927,28.78 c0,0-0.569-0.307-1.357-0.736c-0.925-1.496-2.196-3.552-2.846-4.601c-0.914-1.524-1.63-3.263-1.638-3.28l-0.148-0.36 c1.026-0.236,2.423,0.327,3.972,1.295c0.03,0,0.54,0.283,1.242,0.685c0.953,1.541,2.34,3.768,2.985,4.737 c0.854,1.353,1.473,3.258,1.478,3.277l0.07,0.218C28.621,30.104,27.258,29.668,25.927,28.78z M34.66,25.84l-3.444,3.444 c0,0-0.673-2.1-1.68-3.695c-1.008-1.512-3.948-6.3-3.948-6.3c-1.26-2.016-1.428-4.032-0.42-5.04l3.864-3.864 c0,0,0.252,2.352,1.26,4.032C31.384,16.18,34.24,20.8,34.24,20.8C35.5,22.816,35.668,24.832,34.66,25.84z M37.516,19.96 l-3.213-2.252l-2.583-4.176c-0.65-1.085-0.957-2.773-1.018-3.33l-0.114-1.029c1.244-0.44,2.973-0.004,4.656,1.291 c0.84,0.589,6.388,4.456,6.388,4.456L37.516,19.96z"></path>
            </svg>
        <h1 className="text-3xl font-bold text-white">PathS</h1>
      </div>

      {/* Login Form */}
      <div className="relative z-10 bg-white bg-opacity-20 p-8 rounded-lg shadow-lg w-96 transition duration-300 ease-in-out transform hover:scale-105">
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-700">Login</h2>
        <p className="text-sm font-medium text-center mb-6 text-gray-400">Select Your Role and Login</p>

        {/* Role Dropdown */}
        <div className="mb-4 flex justify-end">
          <select
            className="p-2 border border-gray-500 bg-slate-100 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 text-sm transition duration-300 ease-in-out"
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
        
        {/* Username Field */}
        <div className="mb-4 relative">
          <FaUser className="absolute left-3 top-5 text-gray-400" />
          <input
            type="text"
            placeholder="Email"
            className="w-full pt-3 pb-3 pl-10 border border-gray-300 bg-slate-100 rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Password Field */}
        <div className="mb-4 relative">
          <FaLock className="absolute left-3 top-5 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            className="w-full pt-3 pb-3 pl-10 border border-gray-300 bg-slate-100 rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Login Button */}
        <button
          className="w-full bg-gradient-to-br from-blue-overlay via-rebecca-purple to-orange-overlay bg-rebecca-purple text-white p-3 rounded hover:from-bg-gradient-to-br from-blue-overlay via-rebecca-purple to-orange-overlay bg-rebecca-purple hover:to-indigo-800 text-white p-3 rounded hover:opacity-95 transition duration-400 ease-in-out"
          onClick={handleLogin}
        >
          Login
        </button>

        {role === 'Customer' && (
          <p className="text-center mt-4 text-gray-600">
            Don't have an account?{' '}
            <span 
              className="text-blue-500 cursor-pointer hover:underline" 
              onClick={() => navigate('/create-account')}
            >
              Create account
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
















