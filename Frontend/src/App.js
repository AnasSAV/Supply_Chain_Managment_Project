import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import Dashboard from './pages/Dashboard';

import CustomerOrders from './pages/Customer/Orders'; // Import your Orders component
import Profile from './pages/Customer/Profile'; // Import Profile component
import CustomerDashboard from './components/CustomerDashboard'; // Import CustomerDashboard component
import Shop from './pages/Customer/Shop';

import Orders from './pages/Admin/Orders';
import Assignments from './pages/Admin/Assignments';
import Analytics from './pages/Admin/Analytics';
import AdminDashboard from './components/AdminDashboard';
import Roster from './pages/Admin/Roster'

import Home from './pages/Home/Home';
import HomeShop from './pages/Home/Shop';
import Contact from './pages/Home/Contact';

import ManagerOrders from './pages/Manager/Orders';
import ManagerAssignments from './pages/Manager/Assignments';
import ManagerCustomers from './pages/Manager/Customers';
import ManagerDashboard from './components/ManagerDashboard';
import ManagerRoster from './pages/Manager/Roster';

import Rides from './pages/Driver/Rides';
import DriverOrders from './pages/Driver/Orders';
import DriverDashboard from './components/DriverDashboard';
import Map from './components/Map';

import AssistantDashboard from './components/AssistantDashboard';
import AssistantOrders from './pages/Assistant/Orders';
import AssistantRides from './pages/Assistant/Rides';

import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute for route protection


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Home />} />
          <Route path="shop" element={<HomeShop />} />
          <Route path="contact" element={<Contact />} />

          {/* Admin Protected Routes */}
          <Route 
            path="/admin" 
            element={
              <PrivateRoute requiredRole="admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          >
            <Route path="orders" element={<Orders />} />
            <Route path="assignments" element={<Assignments />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="roster" element={<Roster />} />
            <Route path="" element={<Navigate to="/admin" />} />
          </Route>

          <Route 
            path="/customer" 
            element={
              <PrivateRoute requiredRole="Customer">
                <CustomerDashboard />
              </PrivateRoute>
            }
          >
            <Route path="orders" element={<CustomerOrders />} />
            <Route path="shop" element={<Shop />} />
            <Route path="profile" element={<Profile />} />
            <Route path="" element={<Navigate to="dashboard" />} /> {/* Redirects to dashboard */}
          </Route>

          <Route 
            path="/driver" 
            element={
              <PrivateRoute requiredRole="Driver">
                <DriverDashboard />
              </PrivateRoute>
            }
          >
            <Route path="rides" element={<Rides />} />
            <Route path="orders" element={<DriverOrders />} />
            <Route path="" element={<Navigate to="dashboard" />} /> {/* Redirects to dashboard */}
          </Route>

          <Route 
            path="/assistant" 
            element={
              <PrivateRoute requiredRole="Driver">
                <AssistantDashboard />
              </PrivateRoute>
            }
          >
            <Route path="rides" element={<AssistantRides />} />
            <Route path="orders" element={<AssistantOrders />} />
            <Route path="" element={<Navigate to="dashboard" />} /> {/* Redirects to dashboard */}
          </Route>

          {/* Manager Protected Routes */}
          <Route 
            path="/manager" 
            element={
              <PrivateRoute requiredRole="Manager">
                <ManagerDashboard />
              </PrivateRoute>
            }
          >
            <Route path="orders" element={<ManagerOrders />} />
            <Route path="assignments" element={<ManagerAssignments />} />
            <Route path="customers" element={<ManagerCustomers />} />
            <Route path="roster" element={<ManagerRoster />} />

          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
