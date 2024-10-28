import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const orders = [
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

  useEffect(() => {
    if (confirmationMessage) {
      const timer = setTimeout(() => {
        setConfirmationMessage('');
      }, 3000); 
      return () => clearTimeout(timer); 
    }
  }, [confirmationMessage]);

  const handleIncrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] + 1, 
    }));
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
                  <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                </del>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center mt-3">
                <button
                  className="px-2 py-1 bg-gray-200 text-gray-600 rounded-l"
                  onClick={() => handleDecrement(order.id)} 
                >
                  -
                </button>
                <div className="px-3 py-1 border border-gray-200 text-gray-800">{quantities[order.id]}</div>
                <button
                  className="px-2 py-1 bg-gray-200 text-gray-600 rounded-r"
                  onClick={() => handleIncrement(order.id)} 
                >
                  +
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleBuy(order.id); 
                  }}
                  className="ml-auto px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} 
        onConfirm={confirmOrder} 
        orderId={selectedOrderId}
        quantity={selectedQuantity}
      />
    </div>
  );
};

export default Shop;
export { orders };
