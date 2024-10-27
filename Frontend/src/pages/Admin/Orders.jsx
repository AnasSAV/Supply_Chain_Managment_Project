import React, { useState } from 'react';

// Placeholder data (you can replace it with dynamic data later)
const sampleOrders = [
  { 
    id: '001', 
    customer: 'John Doe', 
    total: '$120.00', 
    status: 'Shipped', 
    profilePic: 'https://via.placeholder.com/50',
    details: 'Order shipped via FedEx, expected delivery on 10/15/2024.'
  },
  { 
    id: '002', 
    customer: 'Jane Smith', 
    total: '$150.00', 
    status: 'Pending', 
    profilePic: 'https://via.placeholder.com/50',
    details: 'Pending payment verification, shipping will start after approval.'
  },
  // More sample orders...
];

const Orders = ({ limit, isAdmin }) => {
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const [selectedOrder, setSelectedOrder] = useState(null); // State for selected order (for the overlay)

  // Filter orders based on the search query
  const filteredOrders = sampleOrders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle clicking an order (opens the overlay with selected order details)
  const openOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  // Function to close the overlay
  const closeOverlay = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="space-y-4">
      {/* Heading for Orders Page */}
      <h1 className="text-2xl font-bold text-gray-700 mb-4 mt-4 ml-3 text-left">Orders</h1>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Order ID"
          className="w-full p-2 border border-gray-300 rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Orders Table */}
      <div className={isAdmin ? "w-full" : ""}></div>
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
          {filteredOrders.slice(0, limit).map(order => (
            <tr 
              key={order.id} 
              className="hover:bg-gray-100 cursor-pointer transition-colors duration-200"
              onClick={() => openOrderDetails(order)}
            >
              <td className="py-2 px-4 border-b">{order.id}</td>
              <td className="py-2 px-4 border-b">{order.customer}</td>
              <td className="py-2 px-4 border-b">{order.total}</td>
              <td className="py-2 px-4 border-b">
                <span 
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === 'Shipped' ? 'bg-green-100 text-green-700' : 
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                    order.status === 'Delivered' ? 'bg-blue-100 text-blue-700' : 
                    'bg-red-100 text-red-700'
                  }`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}

          {/* If no orders found */}
          {filteredOrders.length === 0 && (
            <tr>
              <td colSpan="4" className="text-gray-600 text-center py-4">No orders found.</td>
            </tr>
          )}
        </tbody>
      </table>

        {selectedOrder && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={closeOverlay} // Clicking outside the overlay closes it
            style={{ top: -20, left: 0, right: 0, bottom: 0 }} // Ensure the overlay fully covers the page
          >
        
          {/* Order Details Box */}
          <div 
            className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md mx-auto"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the box
          >
            <button 
              className="absolute top-2 right-2 text-gray-700"
              onClick={closeOverlay} // Close button
            >
              &#x2715; {/* Close (X) icon */}
            </button>
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <p><strong>Order ID:</strong> {selectedOrder.id}</p>
            <p><strong>Customer:</strong> {selectedOrder.customer}</p>
            <p><strong>Total:</strong> {selectedOrder.total}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Details:</strong> {selectedOrder.details}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;










