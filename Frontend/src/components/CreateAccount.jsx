import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaAddressCard } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateAccount = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captcha, setCaptcha] = useState('');
  const navigate = useNavigate();

  const generateCaptcha = () => {
    const randomCaptcha = Math.floor(1000 + Math.random() * 9000).toString();
    setCaptcha(randomCaptcha);
  };

  const handleCreateAccount = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (captchaInput !== captcha) {
      alert('Incorrect CAPTCHA!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/customers/register', {
        email: email,
        password: password,
        name: name,
        contact_number: phone,
        delivery_address: address
      });

      alert('Account created successfully!');
      navigate('/login');
    } catch (error) {
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('Failed to create account. Please try again.');
      }
      console.error('Registration error:', error);
    }
  };

  React.useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-w-screen bg-cover bg-center font-roboto">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url("https://replydam.discoveryreplymedia.com/production/14/14/901bd07d-9c94-11d4-ea68-dd9111f80085/8bf29c37-f50c-4234-9aaf-bd14848f5365.jpg")',
        }}
      />
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      <div className="relative z-10 mb-1 mt-3 flex items-center text-center">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50" fill='#ffff' className='mr-3 mb-2  '>
                <path d="M36,4H14C8.477,4,4,8.477,4,14v22c0,5.523,4.477,10,10,10h22c5.523,0,10-4.477,10-10V14C46,8.477,41.523,4,36,4z M14.869,39.252c-0.84-0.587-6.333-4.256-6.333-4.256l4.116-5.04l2.559,1.827c0.951,1.536,2.298,3.699,2.931,4.649 c0.632,0.948,0.931,2.78,0.985,3.346l0.073,0.759C17.964,40.778,16.399,40.312,14.869,39.252z M24.664,35.752L20.8,39.616 c0,0-0.252-2.605-1.26-4.116c-1.008-1.511-3.948-6.3-3.948-6.3c-1.26-2.016-1.428-4.032-0.42-5.04l3.36-3.36 c0,0,0.756,1.848,1.764,3.528c1.092,1.764,3.948,6.384,3.948,6.384C25.504,32.728,25.672,34.744,24.664,35.752z M25.927,28.78 c0,0-0.569-0.307-1.357-0.736c-0.925-1.496-2.196-3.552-2.846-4.601c-0.914-1.524-1.63-3.263-1.638-3.28l-0.148-0.36 c1.026-0.236,2.423,0.327,3.972,1.295c0.03,0,0.54,0.283,1.242,0.685c0.953,1.541,2.34,3.768,2.985,4.737 c0.854,1.353,1.473,3.258,1.478,3.277l0.07,0.218C28.621,30.104,27.258,29.668,25.927,28.78z M34.66,25.84l-3.444,3.444 c0,0-0.673-2.1-1.68-3.695c-1.008-1.512-3.948-6.3-3.948-6.3c-1.26-2.016-1.428-4.032-0.42-5.04l3.864-3.864 c0,0,0.252,2.352,1.26,4.032C31.384,16.18,34.24,20.8,34.24,20.8C35.5,22.816,35.668,24.832,34.66,25.84z M37.516,19.96 l-3.213-2.252l-2.583-4.176c-0.65-1.085-0.957-2.773-1.018-3.33l-0.114-1.029c1.244-0.44,2.973-0.004,4.656,1.291 c0.84,0.589,6.388,4.456,6.388,4.456L37.516,19.96z"></path>
            </svg>
        <h1 className="text-3xl font-bold text-white">CompanyA</h1>
      </div>

      <div className="relative z-10 bg-white bg-opacity-50 p-8 rounded-lg shadow-lg w-128 transition duration-300 ease-in-out transform hover:scale-95">
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Create Account</h2>
        <p className="text-sm font-medium text-center mb-6 text-gray-600">Please fill in all the fields</p>

        <div className="mb-4">
          <div className="relative">
            <FaUser className="absolute left-3 top-5 text-gray-400" />
            <input
              type="text"
              placeholder="Name"
              className="w-full h-12 pt-3 pb-3 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-between mb-4">
          <div className="relative w-1/2 mr-2">
            <FaEnvelope className="absolute left-3 top-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full h-12 pt-3 pb-3 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative w-1/2 ml-2">
            <FaPhone className="absolute left-3 top-5 text-gray-400" />
            <input
              type="tel"
              placeholder="Contact Number"
              className="w-full  h-12 pt-3 pb-3 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="relative">
            <FaAddressCard className="absolute left-3 top-5 text-gray-400" />
            <input
              type="text"
              placeholder="Delivery Address"
              className="w-full h-12 pt-3 pb-3 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-between mb-4">
          <div className="relative w-1/2 mr-2">
            <FaLock className="absolute left-3 top-5 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full h-12 pt-3 pb-3 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="relative w-1/2 ml-2">
            <FaLock className="absolute left-3 top-5 text-gray-400" />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full h-12 pt-3 pb-3 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center mb-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Enter CAPTCHA"
              className="w-1/2 h-12 pt-3 pb-3 pl-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
            />
            <span className="text-gray-900 ml-4 text-lg font-bold">{captcha}</span>
          </div>
        </div>

        <button
          className="w-full bg-gradient-to-br from-blue-overlay via-rebecca-purple to-orange-overlay text-white p-3 rounded hover:opacity-95 transition duration-400 ease-in-out"
          onClick={handleCreateAccount}
        >
          Create Account
        </button>

        <p className="text-center mt-4 text-gray-800">
          Already have an account?{' '}
          <span 
            className="text-indigo-900 cursor-pointer hover:underline" 
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




