import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const HomeShop = ({ products = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle moving to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to handle moving to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  // Auto play every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentIndex]);

  // Orders data
  const orders = [
    {
      id: '001',
      products: 'Product A',
      imgSrc: 'https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: '002',
      products: 'Product B',
      imgSrc: 'https://images.unsplash.com/photo-1651950519238-15835722f8bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mjh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: '003',
      products: 'Product C',
      imgSrc: 'https://images.unsplash.com/photo-1651950537598-373e4358d320?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MjV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: '004',
      products: 'Product D',
      imgSrc: 'https://images.unsplash.com/photo-1651950540805-b7c71869e689?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mjl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: '005',
      products: 'Product E',
      imgSrc: 'https://images.unsplash.com/photo-1649261191624-ca9f79ca3fc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NDd8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    },
  ];

  return (
    <div className="p-6">
      {/* Navigation Section */}
      <section className="w-full px-8 text-gray-700 bg-white mb-6">
        <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
          <div className="relative flex flex-col md:flex-row items-center">
          <a href="/" className="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md :mb-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mr-2" viewBox="0 0 30 30" fill="#000000">
                <path d="M20.752 10.993c0-.17-.05-.33-.13-.48l-2.77-5.02c-.46-.91-1.37-1.48-2.4-1.5-1.04-.02-1.98.54-2.44 1.4l-3.04 5.09c-.1.15-.15.33-.15.51h2.19 7H20.752zM14.752 6.373c.19-.35.53-.38.67-.38.13 0 .47.05.64.4.01.01.02.03.03.04l1.41 2.56h-4.31L14.752 6.373zM27.192 22.763l-1.54-2.77h-21.1l-1.62 2.71c-.8 1.5.31 3.29 2.04 3.29h20.14C26.812 25.993 27.922 24.263 27.192 22.763zM5.752 17.993L24.552 17.993 21.782 12.993 8.742 12.993z"></path>
              </svg>
            </a>
            <nav className="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200 no-underline">
              <Link to="/" className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900 no-underline">Home</Link>
              <Link to="/shop" className="mr-5 font-medium leading-6 text -gray-600 hover:text-gray-900 no-underline">Shop</Link>
              <Link to="/contact" className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900 no-underline">Contact Us</Link>
            </nav>
            </div>

            <div className="inline-flex items-center ml-5 space-x-6 lg:justify-end">
              <Link to="/login" className="no-underline inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                Login
              </Link>
            </div>
        </div>
      </section>

      <h1 className="text-5xl font-bold text-center mt-8 mb-4">Available Items</h1>
      {/* <div className="flex justify-center"></div> */}
      {/* Carousel Section */}
      <section className="w-full max-w-4xl mx-auto relative ">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform ease-out duration-500"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {products.length > 0 ? (
              products.map((product, index) => (
                <div key={index} className="flex-shrink-0 w-full">
                  <img
                    src={product.imgSrc}
                    alt={product.name}
                    className="w-full h-80 object-cover rounded-xl"
                  />
                  <h2 className="text-center text-xl font-semibold mt-2">{product.name}</h2>
                  <p className="text-center text-gray-600">{product.description}</p>
                  <p className="text-center text-lg font-bold text-black mt-2">{`$${product.price}`}</p>
                </div>
              ))
            ) : (
              <div className="w-full text-center py-20">
                {/* <p>No products available</p> */}
              </div>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        {products.length > 0 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
            >
              Prev
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
            >
              Next
            </button>
          </>
        )}
      </section>

      {/* Orders Section */}
      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {orders.map((order) => (
          <div
            key={order.id}
            className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
          >
            <img
              src={order.imgSrc}
              alt={`Order ${order.id}`}
              className="w-full h-40 object-cover rounded-t-xl"
            />
            <div className="px-4 py-3 w-72">
              <span className="text-gray-400 mr-3 uppercase text-xs">Order Available</span>
              <p className="text-lg font-bold text-black truncate block capitalize">{order.products}</p>
              <div className="flex items-center">
                <p className="text-lg font-semibold text-black cursor-auto my-3">{order.date}</p>
                <del>
                  <p className="text text-gray-600 cursor-auto ml-2">$199</p>
                </del>
                <p className="text text-gray-600 cursor-auto ml-2">$179</p>
                <div className="ml-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-bag-plus"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8 a.5.5 0 0 1 .5-.5z"
                    />
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default HomeShop;