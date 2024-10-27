import React, { useState, useEffect } from 'react';


const sampleOrders = [
  { id: 1, product: 'Product A', quantity: 2, date: '2024-10-01', status: 'Shipped' },
  { id: 2, product: 'Product B', quantity: 1, date: '2024-10-02', status: 'Pending' },
  { id: 3, product: 'Product C', quantity: 4, date: '2024-10-03', status: 'Delivered' },
  { id: 4, product: 'Product D', quantity: 1, date: '2024-10-04', status: 'Cancelled' },
];

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    
    setOrders(sampleOrders);
  }, []);

 
  const filteredOrders = orders.filter(order => {
    if (filter === 'All') return true;
    return order.status === filter;
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4">Orders</h1>

      {/* Filter dropdown */}
      <label htmlFor="filter" className="block mb-2">
        Filter by Status:
      </label>
      <select
        id="filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border border-gray-300 rounded-md p-2 mb-4"
      >
        <option value="All">All</option>
        <option value="Shipped">Shipped</option>
        <option value="Pending">Pending</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      {/* Orders table */}
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Order ID</th>
            <th className="border border-gray-300 p-2">Product</th>
            <th className="border border-gray-300 p-2">Quantity</th>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="border border-gray-300 p-2">{order.id}</td>
                <td className="border border-gray-300 p-2">{order.product}</td>
                <td className="border border-gray-300 p-2">{order.quantity}</td>
                <td className="border border-gray-300 p-2">{order.date}</td>
                <td className="border border-gray-300 p-2">{order.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="border border-gray-300 p-2 text-center">No orders found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerOrders;
