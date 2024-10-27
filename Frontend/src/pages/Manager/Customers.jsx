import React, { useState } from 'react';

// Placeholder data (you can replace it with dynamic data later)
const sampleCustomers = [
  { 
    id: '001', 
    name: 'John Doe', 
    email: 'john@example.com', 
    phone: '123-456-7890', 
    profilePic: 'https://via.placeholder.com/50',
    address: '1234 Elm Street, NY', 
    joinedDate: '2023-05-10'
  },
  { 
    id: '002', 
    name: 'Jane Smith', 
    email: 'jane@example.com', 
    phone: '987-654-3210', 
    profilePic: 'https://via.placeholder.com/50',
    address: '5678 Oak Avenue, CA', 
    joinedDate: '2023-06-15'
  },
  { 
    id: '003', 
    name: 'Sam Wilson', 
    email: 'sam@example.com', 
    phone: '555-555-5555', 
    profilePic: 'https://via.placeholder.com/50',
    address: '9102 Pine Blvd, TX', 
    joinedDate: '2023-07-22'
  },
  // Add more customers as needed
];

const ManagerCustomers = ({ limit, isAdmin }) => {
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const [selectedCustomer, setSelectedCustomer] = useState(null); // State for selected order (for the overlay)

  // Filter orders based on the search query
  const filteredCustomers = sampleCustomers.filter(customer =>
    customer.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle clicking an order (opens the overlay with selected order details)
  const openCustomerDetails = (customer) => {
    setSelectedCustomer(customer);
  };

  // Function to close the overlay
  const closeOverlay = () => {
    setSelectedCustomer(null);
  };

  return (
    <div className="space-y-4">
      {/* Heading for Orders Page */}
      <h1 className="text-2xl font-bold text-gray-700 mb-4 mt-4 ml-3 text-left">Customers</h1>

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
            <th className="py-3 px-4 border-b">Customer ID</th>
            <th className="py-3 px-4 border-b">Name</th>

            <th className="py-3 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.slice(0, limit).map(customer => (
            <tr 
              key={customer.id} 
              className="hover:bg-gray-100 cursor-pointer transition-colors duration-200"
              onClick={() => openCustomerDetails(customer)}
            >
              <td className="py-2 px-4 border-b">{customer.id}</td>
              <td className="py-2 px-4 border-b">{customer.name}</td>
              <td className="py-2 px-4 border-b">{customer.email}</td>
              <td className="py-2 px-4 border-b">
                <span 
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    customer.status === 'Shipped' ? 'bg-green-100 text-green-700' : 
                    customer.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                    customer.status === 'Delivered' ? 'bg-blue-100 text-blue-700' : 
                    'bg-red-100 text-red-700'
                  }`}
                >
                  {customer.status}
                </span>
              </td>
            </tr>
          ))}

          {/* If no orders found */}
          {filteredCustomers.length === 0 && (
            <tr>
              <td colSpan="4" className="text-gray-600 text-center py-4">No customers found.</td>
            </tr>
          )}
        </tbody>
      </table>

        {selectedCustomer && (
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
            <h2 className="text-xl font-bold mb-4">Customer Details</h2>
            <p><strong>Customer ID:</strong> {selectedCustomer.id}</p>
            <p><strong>Customer Name:</strong> {selectedCustomer.customer}</p>
            <p><strong>Status:</strong> {selectedCustomer.status}</p>
            <p><strong>Details:</strong> {selectedCustomer.details}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerCustomers;
