import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const orders = [
  {
    id: '001',
    date: 'Oct 1, 2024',
    products: '2x Product A, 1x Product B',
    imgSrc: 'https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: '002',
    date: 'Oct 3, 2024',
    products: '1x Product C',
    imgSrc: 'https://images.unsplash.com/photo-1651950519238-15835722f8bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: '003',
    date: 'Oct 5, 2024',
    products: '1x Product D, 1x Product E',
    imgSrc: 'https://images.unsplash.com/photo-1651950537598-373e4358d320?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: '004',
    date: 'Oct 7, 2024',
    products: '3x Product F',
    imgSrc: 'https://images.unsplash.com/photo-1651950540805-b7c71869e689?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: '005',
    date: 'Oct 9, 2024',
    products: '2x Product G',
    imgSrc: 'https://images.unsplash.com/photo-1649261191624-ca9f79ca3fc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
];

const Modal = ({ isOpen, onClose, onConfirm, orderId, quantity }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white p-6 rounded shadow-lg z-10">
        <h2 className="text-lg font-bold mb-4">Confirm Order</h2>
        <p>Are you sure you want to buy {quantity} of Order #{orderId}?</p>
        <div className="mt-6 flex justify-end">
          <button
            className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const Shop = () => {
  const [quantities, setQuantities] = useState(
    orders.reduce((acc, order) => {
      acc[order.id] = 1; 
      return acc;
    }, {})
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [confirmationMessage, setConfirmationMessage] = useState(''); 
  const [limitMessage, setLimitMessage] = useState(''); // New state for limit message

  useEffect(() => {
    if (confirmationMessage) {
      const timer = setTimeout(() => {
        setConfirmationMessage('');
      }, 3000); 
      return () => clearTimeout(timer); 
    }
    if (limitMessage) {
      const timer = setTimeout(() => {
        setLimitMessage('');
      }, 3000); // Clear limit message after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [confirmationMessage, limitMessage]);

  const handleIncrement = (id) => {
    setQuantities((prev) => {
      const newQuantity = prev[id] + 1;
      if (newQuantity > 10) {
        setLimitMessage('You can only select up to 10 items.'); // Set limit message
        return prev; // Do not update if limit exceeded
      }
      return {
        ...prev,
        [id]: newQuantity,
      };
    });
  };

  const handleDecrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(prev[id] - 1, 1), 
    }));
  };

  const handleBuy = (id) => {
    setSelectedOrderId(id);
    setSelectedQuantity(quantities[id]);
    setIsModalOpen(true); 
  };

  const confirmOrder = () => {
    setConfirmationMessage(`Order #${selectedOrderId} has been confirmed.`); 
    setIsModalOpen(false); 
  };

  return (
    <div className="p-6">
      {confirmationMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 border border-green-400 rounded flex items-center justify-between">
          <span className="font-semibold">{confirmationMessage}</span>
          <button
            className="ml-4 p-1 bg-green-200 rounded-full hover:bg-green-300"
            onClick={() => setConfirmationMessage('')}
          >
            &times;
          </button>
        </div>
      )}
      {limitMessage && ( // Display limit message
        <div className="mb-4 p-4 bg-red-100 text-red-800 border border-red-400 rounded flex items-center justify-between">
          <span className="font-semibold">{limitMessage}</span>
          <button
            className="ml-4 p-1 bg-red-200 rounded-full hover:bg-red-300"
            onClick={() => setLimitMessage('')}
          >
            &times;
          </button>
        </div>
      )}
      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {orders.map((order) => (
          <div
            key={order.id}
            className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
          >
            <img
              src={order.imgSrc}
              alt="Product"
              className="w-full h-40 object-cover rounded-t-xl"
            />
            <div className="px-4 py-3 w-72">
              <span className="text-gray-400 mr-3 uppercase text-xs">Order #{order.id}</span>
              <p className="text-lg font-bold text-black truncate block capitalize">{order.products}</p>
              <div className="flex items-center">
                <p className="text-lg font-semibold text-black cursor-auto my-3">{order.date}</p>
                <del>
                  <p className="text-sm text-gray-600 cursor-auto ml-2">199 $</p>
 </del>
 <p className="text-sm text-gray-600 cursor-auto ml-2">179</p>
                <p className="text-lg font-bold text-black cursor-auto ml-2">${order.price}</p>
              </div>
              <div className="flex justify-between items-center">
                <button
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDecrement(order.id)}
                >
                  -
                </button>
                <span className="text-lg font-bold">{quantities[order.id]}</span>
                <button
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleIncrement(order.id)}
                >
                  +
                </button>
                <button
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded ml-4"
                  onClick={() => handleBuy(order.id)}
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg p-4 w-1/2 h-1/2 flex flex-col justify-center items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-4">Confirm Order</h2>
            <p className="text-lg mb-4">Order #${selectedOrderId}</p>
            <p className="text-lg mb-4">Quantity: {selectedQuantity}</p>
            <button
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
              onClick={confirmOrder}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;