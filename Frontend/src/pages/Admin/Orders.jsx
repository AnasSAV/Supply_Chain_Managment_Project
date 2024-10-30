import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/AuthContext';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'http://localhost:3000/api/trainTrips/get-all-order-details',
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data.success) {
          setOrders(response.data.orders);
        } else {
          toast.error('Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error(error.response?.data?.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order =>
    order['Order_ID'].toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Shipped':
        return 'bg-blue-100 text-blue-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Delivered':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const closeOverlay = () => {
    setSelectedOrder(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-700 mb-4 mt-4 ml-3 text-left">Orders</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Order ID"
          className="w-full p-2 border border-gray-300 rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-left">
            <th className="py-3 px-4 border-b">Order ID</th>
            <th className="py-3 px-4 border-b">Customer</th>
            <th className="py-3 px-4 border-b">Total</th>
            <th className="py-3 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <tr 
                key={order['Order_ID']} 
                className="hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                onClick={() => openOrderDetails(order)}
              >
                <td className="py-2 px-4 border-b">#{order['Order_ID']}</td>
                <td className="py-2 px-4 border-b">{order.Customer || 'N/A'}</td>
                <td className="py-2 px-4 border-b">Rs. {order.Total ? order.Total.toFixed(2) : '0.00'}</td>
                <td className="py-2 px-4 border-b">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.Status)}`}>
                    {order.Status || 'Unknown'}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-gray-600 text-center py-4">No orders found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedOrder && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeOverlay}
          style={{ top: -20, left: 0, right: 0, bottom: 0 }}
        >
          <div 
            className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-2 right-2 text-gray-700"
              onClick={closeOverlay}
            >
              &#x2715;
            </button>
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <p><strong>Order ID:</strong> #{selectedOrder['Order_ID']}</p>
            <p><strong>Customer:</strong> {selectedOrder.Customer || 'N/A'}</p>
            <p><strong>Total:</strong> Rs. {selectedOrder.Total ? selectedOrder.Total.toFixed(2) : '0.00'}</p>
            <p><strong>Status:</strong> 
              <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.Status)}`}>
                {selectedOrder.Status || 'Unknown'}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;










