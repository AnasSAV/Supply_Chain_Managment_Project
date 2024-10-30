import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const orders = [
  {
    id: 1, products: 'Apple iPhone 13 Pro Gold 3D Model', price: 999, totalCapacity: 5, imgSrc: 'https://image.made-in-china.com/202f0j00ocCkiewWPvbn/Wholesale-of-Original-Brand-New-Smartphone-12-PRO-12-PRO-Max-Unlock-Phone.jpg',
  },
  {
    id: 2, products: 'Apple iphone 15 Pro 128GB', price: 980, totalCapacity: 10, imgSrc: 'https://www.mistermobile.com.sg/wp-content/uploads/2024/09/Product-images-800-x-800-px-3-450x450.png',
  },
  {
    id: 3, products: 'Apple AirPods Max – Black', price: 200, totalCapacity: 5, imgSrc: 'https://d2bschjhk4kxui.cloudfront.net/assets/images/product/62b4a2b30681a1656005299.jpg',
  },
  {
    id: 4, products: 'Transparent Back Cover for iPhone', price: 10, totalCapacity: 15, imgSrc: 'https://d2bschjhk4kxui.cloudfront.net/assets/images/product/655fb5345db951700771124.webp',
  },
  {
    id: 5, products: 'HP 250 G9 Notebook PC – i5 12th Gen', price: 800, totalCapacity: 5, imgSrc: 'https://www.itsquare.lk/wp-content/uploads/2023/07/portatil-hp-250-g8-2x7l3ea-i3-8gb-512gb-ssd-15-6-win10-13.jpg',
  },
  {
    id: 6, products: 'Refrigerator Innovex Direct Cool Refrigerator DDR195 – 180Ltr', price: 2000, totalCapacity: 10, imgSrc: 'https://damroonline.lk/wp-content/uploads/2021/06/DDR195-mr.jpg',
  },
  {
    id: 7, products: 'JS Hello 3+ AMOLED Smart Watch AMOLED 4GB ROM ChatGPT 1:1 Size', price: 700, totalCapacity: 10, imgSrc: 'https://d2bschjhk4kxui.cloudfront.net/assets/images/product/6513334a6447b1695757130.jpg',
  },
  {
    id: 8, products: 'Apple iPad Pro 11 inch M1 Chip 2021', price: 1000, totalCapacity: 5, imgSrc: 'https://d2bschjhk4kxui.cloudfront.net/assets/images/product/60ddbd41d9d6c1625144641.jpg',
  },
  {
    id: 9, products: 'ASPOR A305 10000mAh Wireless Charging PowerBank', price: 179, totalCapacity: 15, imgSrc: 'https://www.simplytek.lk/cdn/shop/files/ASPOR-A305-PB-SIMPLYTEK-LK_610x_crop_center.png?v=1694426514',
  },
  {
    id: 10, products: 'Haylou RS4 Plus Smart Watch with AMOLED Screen', price: 179, totalCapacity: 5, imgSrc: 'https://d2bschjhk4kxui.cloudfront.net/assets/images/product/65132a6867bf51695754856.webp',
  },
  {
    id: 11, products: 'JBL PartyBox Encore', price: 179, totalCapacity: 5, imgSrc: 'https://d2bschjhk4kxui.cloudfront.net/assets/images/product/63dacd9be5f6d1675283867.jpg',
  },
  {
    id: 12, products: '3D Analog Joystick For PlayStation 5', price: 179, totalCapacity: 15, imgSrc: 'https://d2bschjhk4kxui.cloudfront.net/assets/images/product/62c2b66e2ba921656927854.jpg',
  },
  {
    id: 13, products: 'Meta Quest 2 Advanced All In One Virtual Reality Headset 128 GB ', price: 179, totalCapacity: 10, imgSrc: 'https://d2bschjhk4kxui.cloudfront.net/assets/images/product/6215e68380e541645602435.jpeg',
  },
  {
    id: 14, products: 'Product A', price: 179, totalCapacity: 5, imgSrc: 'https://d2bschjhk4kxui.cloudfront.net/assets/images/product/670ae3f27216a1728766962.webp',
  },
  {
    id: 15, products: 'Product A', price: 179, totalCapacity: 10, imgSrc: 'https://d2bschjhk4kxui.cloudfront.net/assets/images/product/63ce21beb4a081674453438.webp',
  },
  {
    id: 16, products: 'Product A', price: 179, totalCapacity: 5, imgSrc: 'https://i0.wp.com/tecroot.lk/wp-content/uploads/2021/05/apex-3.jpg?resize=300%2C300&ssl=1',
  },
  {
    id: 17, products: 'Product A', price: 179, totalCapacity: 10, imgSrc: 'https://i0.wp.com/tecroot.lk/wp-content/uploads/2023/08/1-1.webp?fit=2115%2C1773&ssl=1',
  },
  {
    id: 18, products: 'Product A', price: 179, totalCapacity: 5, imgSrc: 'https://www.nanotek.lk/uploads/product/2339-20240501121009-pd.png',
  },
  {
    id: 19, products: 'Product A', price: 179, totalCapacity: 10, imgSrc: 'https://www.simplytek.lk/cdn/shop/files/JBL-Tune-510BT-Wireless-On-Ear-Bluetooth-Headphones-Sri-Lanka-SimplyTek-2_298x_crop_center.jpg?v=1694424770',
  },
  {
    id: 20, products: 'Product A', price: 179, totalCapacity: 10, imgSrc: 'https://www.simplytek.lk/cdn/shop/files/JBL-Xtreme-4-Simplytek-lk-sri-lanka_2_298x_crop_center.png?v=1711600322',
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
  const [selectedDeliveryType, setSelectedDeliveryType] = useState('COD'); // Default to 'COD'
  const [orderImageSrc, setOrderImageSrc] = useState(''); // State for order image source
  const [orderPrice, setOrderPrice] = useState(0); // State for order price

  // New state variables for Branch ID and Route selection
  const [selectedBranchId, setSelectedBranchId] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('');

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

  const handleBuy = (orderId) => {
    const selectedOrder = orders.find((order) => order.id === orderId);
    if (selectedOrder) {
      setSelectedOrderId(selectedOrder.id);
      setOrderImageSrc(selectedOrder.imgSrc); // Ensure imgSrc is in your order object
      setOrderPrice(selectedOrder.price); // Ensure price is in your order object
      setIsModalOpen(true);
    }
  };

  const confirmOrder = () => {
    // Your order confirmation logic here
    console.log(`Order Confirmed: ${selectedOrderId}, Quantity: ${selectedQuantity}, Delivery Type: ${selectedDeliveryType}`);
    setIsModalOpen(false); // Close the modal after confirmation
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-1">Shop Items</h1>
      <h3 className="text-sm font-medium text-gray-500 mb-4">Select the quantity and buy</h3>
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
      <section className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-y-8 gap-x-6 mt-8 mb-5 px-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="w-56 bg-white shadow-md rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-lg p-3 flex flex-col justify-between"
          >
            {/* Image */}
            <img
              src={order.imgSrc}
              alt={order.products}
              className="w-full h-46 object-cover rounded-md"
            />
            
            {/* Product Info */}
            <div className="mt-2 flex flex-col flex-grow justify-between">
              <p className="text-sm font-semibold text-gray-800 truncate">{order.products}</p>
              <p className="text-md font-bold text-orange-600 my-1">${order.price}</p>

              {/* Bottom Section with Quantity and Buy Button */}
              <div className="flex items-center justify-between mt-2">
              {/* Quantity Adjuster */}
              <div className="flex items-center space-x-2 mt-4 text-xs">
                <button
                  className="w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-900 rounded-full bg-slate-300 hover:text-black focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 transition duration-200"
                  onClick={() => handleDecrement(order.id)}
                >
                  -
                </button>
                <span className="text-md font-medium text-gray-700">{quantities[order.id] || 0}</span>
                <button
                  className="w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-900 rounded-full bg-slate-300 hover:text-black focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 transition duration-200"
                  onClick={() => handleIncrement(order.id)}
                >
                  +
                </button>
              </div>


                {/* Buy Button and Capacity Info */}
                <div className="flex flex-col items-end">
                  <p className="text-xs text-gray-500 mb-2">Total Capacity: {order.totalCapacity}</p>
                  <button
                    className="w-20 mt-1  bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 text-white font-semibold py-1 px-3 rounded-md text-sm transition duration-200"
                    onClick={() => handleBuy(order.id)}
                  >
                    Buy
                  </button>
                </div>
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
      className="bg-white rounded-lg p-6 w-11/12 md:w-1/3 h-auto flex flex-col md:flex-row justify-between items-start shadow-lg transition-transform transform duration-300 scale-100 hover:scale-105"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Left Section: Order Image */}
      <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
        <img
          src={orderImageSrc} // Use the state variable for image source
          alt="Order Image"
          className="w-24 h-24 object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Right Section: Order Details */}
      <div className="flex-grow">
        <h2 className="text-xl font-semibold mb-1">Confirm Order</h2>
        <p className="text-md mb-1">Order #{selectedOrderId}</p>
        <p className="text-md mb-1">Quantity: {selectedQuantity}</p>
        <p className="text-lg font-bold text-blue-500 mb-3">
          Price: ${orderPrice} {/* Use state variable for price */}
        </p>

        {/* Branch ID Selection */}
        <div className="mb-3">
          <label className="block text-md font-medium mb-1" htmlFor="branchId">Select Branch ID</label>
          <select
            id="branchId"
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            onChange={(e) => setSelectedBranchId(e.target.value)}
          >
            <option value="">Choose a Branch</option>
            <option value="B001">Branch B001</option>
            <option value="B002">Branch B002</option>
            <option value="B003">Branch B003</option>
          </select>
        </div>

        {/* Route Selection */}
        <div className="mb-4">
          <label className="block text-md font-medium mb-1" htmlFor="routeId">Select Route</label>
          <select
            id="routeId"
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            onChange={(e) => setSelectedRoute(e.target.value)}
          >
            <option value="">Choose a Route</option>
            <option value="Route1">Route 1</option>
            <option value="Route2">Route 2</option>
            <option value="Route3">Route 3</option>
          </select>
        </div>

        {/* Delivery Type Selection */}
        <div className="flex flex-col space-y-1 mb-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="deliveryType"
              value="COD"
              className="mr-2"
              onChange={() => setSelectedDeliveryType('COD')}
            />
            <span className="text-md">Cash on Delivery</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="deliveryType"
              value="Pay Now"
              className="mr-2"
              onChange={() => setSelectedDeliveryType('Pay Now')}
            />
            <span className="text-md">Pay Now</span>
          </label>
        </div>

        <button
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md w-full transition duration-200 transform hover:scale-105"
          onClick={confirmOrder}
        >
          Confirm Order
        </button>
      </div>
    </div>
  </div>
)}




    </div>
  );
};

export default Shop;