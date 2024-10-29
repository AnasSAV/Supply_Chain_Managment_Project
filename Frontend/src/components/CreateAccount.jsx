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




