import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { FaUser, FaLock } from 'react-icons/fa';

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
        
        // Update AuthContext with user details
        login(
          username,
          null,
          data.role,
          branch_id
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
      } else {
        // Login failed
        alert(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again.');
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="50"
          height="50"
          viewBox="0 0 30 30"
          fill="#ffffff"
          className="mr-3" // Margin right for spacing
        >
          <path d="M20.752 10.993c0-.17-.05-.33-.13-.48l-2.77-5.02c-.46-.91-1.37-1.48-2.4-1.5-1.04-.02-1.98.54-2.44 1.4l-3.04 5.09c-.1.15-.15.33-.15.51h2.19 7H20.752zM14.752 6.373c.19-.35.53-.38.67-.38.13 0 .47.05.64.4.01.01.02.03.03.04l1.41 2.56h-4.31L14.752 6.373zM27.192 22.763l-1.54-2.77h-21.1l-1.62 2.71c-.8 1.5.31 3.29 2.04 3.29h20.14C26.812 25.993 27.922 24.263 27.192 22.763zM5.752 17.993L24.552 17.993 21.782 12.993 8.742 12.993z"></path>
        </svg>
        <h1 className="text-3xl font-bold text-white">CompanyA</h1>
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
















