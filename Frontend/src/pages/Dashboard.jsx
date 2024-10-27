import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import ManagerDashboard from '../components/ManagerDashboard';
import AdminDashboard from '../components/AdminDashboard';
import DriverDashboard from '../components/DriverDashboard';
import AssistantDashboard from '../components/AssistantDashboard';
import CustomerDashboard from '../components/CustomerDashboard';

const Dashboard = () => {
  const { user } = useContext(AuthContext); // Get user from context

  const renderDashboard = () => {
    switch (user.role) { // Access user.role instead of userRole
      case 'manager':
        return <ManagerDashboard />;
      case 'admin':  // Changed from 'Admin' to 'admin'
        return <AdminDashboard />;
      case 'driver':
        return <DriverDashboard />;
      case 'assistant':
        return <AssistantDashboard />;
      case 'customer':
        return <CustomerDashboard />;
      default:
        return <p className="text-center text-red-500">No dashboard available for this role.</p>;
    }
  };

  return <div className="min-h-screen bg-gray-100">{renderDashboard()}</div>;
};

export default Dashboard;





