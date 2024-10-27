import React, { useEffect, useContext, useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { AiFillDashboard } from "react-icons/ai";
import { FaRoute, FaTruck } from "react-icons/fa";
import { GoogleMap, DirectionsRenderer, Marker, TrafficLayer, useLoadScript } from "@react-google-maps/api";
import { useRef } from "react";
import { Calendar as ReactCalendar } from 'react-calendar'; // Example using react-calendar
import 'react-calendar/dist/Calendar.css'; // Import calendar styles

const libraries = ["places"];

const MapComponent = ({ currentPosition, markers, setMarkers, directions }) => {
  const mapRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCJDIGEYdFQRCcM7Fg4QEE6N6YfUpPjnTg", 
    libraries,
  });

  const handleMapClick = (event) => {
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarkers((current) => [...current, newMarker]);
  };

  const handleMarkerClick = (marker) => {
    alert(`Marker at position: ${marker.lat}, ${marker.lng}`);
  };

  useEffect(() => {
    if (mapRef.current && currentPosition) {
      mapRef.current.panTo(currentPosition);
    }
  }, [currentPosition]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '800px' }}
      center={currentPosition}
      zoom={10}
      onClick={handleMapClick}
      onLoad={(map) => (mapRef.current = map)}
      options={{
        zoomControl: true,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        panControl: true,
        mapId: 'YOUR_MAP_ID', // Optional for map styling
      }}
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker}
          onClick={() => handleMarkerClick(marker)}
          icon={{
            url: '/path/to/truck-icon.png',
            scaledSize: isLoaded && window.google ? new window.google.maps.Size(50, 50) : undefined,
          }}
        />
      ))}

      {directions && <DirectionsRenderer directions={directions} />}
      <TrafficLayer />
    </GoogleMap>
  );
};

const Timeline = () => {
  const events = [
    { time: '8:00 AM', event: 'Pickup from Warehouse A' },
    { time: '10:30 AM', event: 'Deliver to Customer B' },
    // Add more events as needed
  ];

  return (
    <div className="border rounded-lg p-4 bg-white shadow-md font-roboto">
      <h3 className="text-xl font-semibold mb-2">Timeline</h3>
      {events.map((event, index) => (
        <div key={index} className="flex items-center justify-between border-b py-2">
          <span className="text-gray-700">{event.time}</span>
          <span className="text-gray-600">{event.event}</span>
        </div>
      ))}
    </div>
  );
};

const DriverDashboard = ({ routes }) => {
  const location = useLocation(); 
  const isActive = (path) => location.pathname === path;
  const { user, logout } = useContext(AuthContext); 
  const navigate = useNavigate(); 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    logout(); 
    navigate('/login'); 
  };

  const [currentPosition, setCurrentPosition] = useState({ lat: 6.9271, lng: 79.8612 }); // Default position (Colombo)
  const [markers, setMarkers] = useState([{ lat: 6.9271, lng: 79.8612 }]); // Default marker at Colombo
  const [directions, setDirections] = useState(null);

  // Get user's current position
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          console.log("Current position set:", position.coords); // Debugging log
        },
        () => {
          console.error("Error getting user location");
        }
      );
    }
  }, []);

  useEffect(() => {
    if (location.pathname === '/dashboard') {
      console.log("Dashboard loaded"); // Debugging log
    }
  }, [location.pathname]);

  const tasks = [
    { title: 'Pickup from Warehouse A', time: '8:00 AM' },
    { title: 'Deliver to Customer B', time: '10:30 AM' },
    // Add more tasks as needed
  ];

  return (
    <div className="flex min-h-screen font-roboto">
      <div className="w-64 bg-gradient-to-tr from-stone-900 via-pink-900 to-red-900 shadow-xl rounded-r-xl">
        <div className="py-6 px-6 flex items-center justify-center">
          <Link to="/" className="flex items-center" style={{ textDecoration: 'none' }}>
            <h2 className="text-2xl font-semibold text-white ml-1">CompanyA</h2>
          </Link>
        </div>
        <div className="flex items-center px-6 py-4 text-gray-200 mb-0 mt-6">
          <img
            className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 cursor-pointer"
            src="https://cdn.bestmovie.it/wp-content/uploads/2024/03/sydney-sweeney.jpg"
            alt="Profile Avatar"
            onClick={openModal}
          />
          <div className="ml-4">
            <p className="mb-0 font-semibold text-white cursor-pointer" onClick={openModal}>{user.username}</p>
            <p className="mb-1 text-sm text-gray-300 cursor-pointer" onClick={openModal}>{user.role}</p>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative bg-white p-20 rounded-2xl shadow-lg flex space-x-10">
              <div className="relative">
                <img
                  className="w-96 h-96 rounded-full object-cover"
                  src="https://cdn.bestmovie.it/wp-content/uploads/2024/03/sydney-sweeney.jpg"
                  alt="Enlarged Avatar"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Profile Details</h2>
                <p className="text-lg text-gray-600"><span className="font-bold">Username: </span>{user.username}</p>
                <p className="text-lg text-gray-600"><span className="font-bold">Email: </span>{user.email}</p>
                <p className="text-lg text-gray-600"><span className="font-bold">Role: </span>{user.role}</p>
                <div className="mt-6">
                  <button
                    className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="px-5 mb-5 mt-0">
          <button
            onClick={handleLogout}
            className="w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-xs px-5 py-1.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Logout
          </button>
        </div>

        <div className="mb-10">
          <h3 className="mx-6 mb-3 text-xs text-gray-300 uppercase tracking-widest">Driver</h3>
          <Link
            to="/dashboard"
            className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 no-underline ${
              isActive('/dashboard')
                ? 'bg-gradient-to-r from-red-600 via-pink-800 to-red-500 text-white'
                : 'text-gray-200 hover:bg-orange-100 hover:text-black'
            }`}
          >
            <AiFillDashboard className="h-5 w-5 mr-3" />
            Dashboard
          </Link>

          <Link
            to="/driver/rides"
            className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 no-underline ${
              isActive('/driver/rides')
                ? 'bg-gradient-to-r from-red-600 via-pink-800 to-red-500 text-white'
                : 'text-gray-200 hover:bg-orange-100 hover:text-black'
            }`}
            
          >
            <FaRoute className="h-5 w-5 mr-3" />
            Rides
          </Link>

          <Link
            to="/driver/orders"
            className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 no-underline ${
              isActive('/driver/orders')
                ? 'bg-gradient-to-r from-red-600 via-pink-800 to-red-500 text-white'
                : 'text-gray-200 hover:bg-orange-100 hover:text-black'
            }`}
          >
            <FaTruck className="h-5 w-5 mr-3" />
            Orders
          </Link>
        </div>
      </div>



      <div className="flex-1 p-6 bg-gray-100">
        {location.pathname === '/dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <section className="p-6 space-y-5 w-800">
              <h2 className="text-3xl mb-0 font-bold">Dashboard</h2>
              <p className="text-xl text-gray-600 mt-0 font-semibold">Overview</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Today's Distance */}
                <div className="p-3 bg-white rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 relative">
                  <h3 className="text-lg font-semibold">Work Hours Left</h3>
                  <p className="mt-1 text-3xl font-bold text-green-600">5 Hrs</p>
                  <p className="mt-1 text-gray-600 text-sm">Total Distance Covered</p>
                  <div className="absolute inset-0 bg-gradient-to-br from-green-200 via-green-300 to-green-500 opacity-25 rounded-2xl blur-xl z-[-1]"></div>
                  <div className="mt-2 h-1.5 w-full bg-gray-200 rounded-full">
                    <div className="h-1.5 bg-green-500 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>

                {/* Tasks Completed */}
                <div className="p-3 bg-white rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 relative">
                  <h3 className="text-lg font-semibold">Tasks Completed</h3>
                  <p className="mt-1 text-3xl font-bold text-blue-600">8/10</p>
                  <p className="mt-1 text-gray-600 text-sm">Deliveries Completed</p>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-blue-300 to-blue-500 opacity-25 rounded-2xl blur-xl z-[-1]"></div>
                  <div className="mt-2 h-1.5 w-full bg-gray-200 rounded-full">
                    <div className="h-1.5 bg-blue-500 rounded-full" style={{ width: "80%" }}></div>
                  </div>
                </div>

                {/* Fuel Level */}
                <div className="p-3 bg-white rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 relative">
                  <h3 className="text-lg font-semibold">Fuel Level</h3>
                  <p className="mt-1 text-3xl font-bold text-yellow-600">75%</p>
                  <p className="mt-1 text-gray-600 text-sm">Remaining Fuel</p>
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-500 opacity-25 rounded-2xl blur-xl z-[-1]"></div>
                  <div className="mt-2 h-1.5 w-full bg-gray-200 rounded-full">
                    <div className="h-1.5 bg-yellow-500 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>
              </div>

              {/* Map and Route Information */}
              <div className="relative p-4 bg-white rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-100">
                  <div className="absolute inset-0 rounded-lg shadow-xl bg-gradient-to-r from-blue-100 to-blue-300 opacity-50"></div>
                  <div className="relative z-10">
                      <h2 className="text-lg font-semibold text-gray-800 mb-4">Map Overview</h2>
                      {/* Increased height of the map container */}
                      <div className="bg-white rounded-lg overflow-hidden shadow-lg h-206"> {/* Change h-100 to h-96 or another desired height */}
                          <MapComponent
                              currentPosition={currentPosition}
                              markers={markers}
                              setMarkers={setMarkers}
                              directions={directions}
                          />
                      </div>
                  </div>
              </div>


            </section>

            <section className="pt-20 mt-4 space-y-5 flex flex-col items-end">
              <div className="flex flex-col items-end w-full">
                {/* Calendar Section */}
                <div className="rounded-lg shadow-lg h-80 w-82 mb-80 transform transition-all duration-300 hover:scale-105 relative">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-100 to-blue-300 opacity-40"></div>
                  <div className="relative z-10 p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Calendar Overview</h3>
                    <ReactCalendar className="rounded-lg shadow-md" />
                  </div>
                </div>

            {/* Timeline Section */}
            <div class="flex justify-center mr-10 items-start relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">

                <div class="space-y-8 flex flex-col items-center">
                    <div class="relative flex flex-col group is-active">
                        <div class="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-emerald-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0">
                            <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="12" height="10">
                                <path fill-rule="nonzero" d="M10.422 1.257 4.655 7.025 2.553 4.923A.916.916 0 0 0 1.257 6.22l2.75 2.75a.916.916 0 0 0 1.296 0l6.415-6.416a.916.916 0 0 0-1.296-1.296Z" />
                            </svg>
                        </div>
                        <div class="w-80 bg-white p-4 rounded border border-slate-200 shadow">
                            <div class="flex items-center justify-between space-x-2 mb-1">
                                <div class="font-bold text-slate-900">Order Placed</div>
                                <time class="font-caveat font-medium text-indigo-500">08/06/2023</time>
                            </div>
                            <div class="text-slate-500">Pretium lectus quam id leo. Urna et pharetra aliquam vestibulum morbi blandit cursus risus.</div>
                        </div>
                    </div>

                    <div class="relative flex flex-col group is-active">
                        <div class="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-emerald-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0">
                            <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="12" height="10">
                                <path fill-rule="nonzero" d="M10.422 1.257 4.655 7.025 2.553 4.923A.916.916 0 0 0 1.257 6.22l2.75 2.75a.916.916 0 0 0 1.296 0l6.415-6.416a.916.916 0 0 0-1.296-1.296Z" />
                            </svg>
                        </div>
                        <div class="w-80 bg-white p-4 rounded border border-slate-200 shadow">
                            <div class="flex items-center justify-between space-x-2 mb-1">
                                <div class="font-bold text-slate-900">Order Placed</div>
                                <time class="font-caveat font-medium text-indigo-500">08/06/2023</time>
                            </div>
                            <div class="text-slate-500">Pretium lectus quam id leo. Urna et pharetra aliquam vestibulum morbi blandit cursus risus.</div>
                        </div>
                    </div>

                    <div class="relative flex flex-col group is-active">
                        <div class="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-emerald-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0">
                            <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="12" height="10">
                                <path fill-rule="nonzero" d="M10.422 1.257 4.655 7.025 2.553 4.923A.916.916 0 0 0 1.257 6.22l2.75 2.75a.916.916 0 0 0 1.296 0l6.415-6.416a.916.916 0 0 0-1.296-1.296Z" />
                            </svg>
                        </div>
                        <div class="w-80 bg-white p-4 rounded border border-slate-200 shadow">
                            <div class="flex items-center justify-between space-x-2 mb-1">
                                <div class="font-bold text-slate-900">Order Placed</div>
                                <time class="font-caveat font-medium text-indigo-500">08/06/2023</time>
                            </div>
                            <div class="text-slate-500">Pretium lectus quam id leo. Urna et pharetra aliquam vestibulum morbi blandit cursus risus.</div>
                        </div>
                    </div>
                </div>
            </div>




                  

              </div>
            </section>
          </div>
        )}

      <Outlet />  
      </div>
    </div>
  );
};

export default DriverDashboard;







