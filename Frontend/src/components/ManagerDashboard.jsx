import { Link, Outlet, useLocation } from 'react-router-dom'; 
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'; 
import Orders from '../pages/Manager/Orders'; 
import Customers from '../pages/Manager/Customers'; 
import OrderMap from '../components/OrderMap';
import { AuthContext } from '../contexts/AuthContext'; // Import AuthContext
import { FaChartBar, FaTruck, FaUsers, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AiFillDashboard } from "react-icons/ai";
import { SiGoogleanalytics } from "react-icons/si";
import { IoIosPeople } from "react-icons/io";
import { MdAssignment } from "react-icons/md";
import { GiRooster } from "react-icons/gi";
import { GoogleMap, useLoadScript, Marker, DirectionsRenderer, TrafficLayer } from '@react-google-maps/api';
import { useEffect, useRef, useState, useContext } from 'react';

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
      mapContainerStyle={{ width: '100%', height: '500px' }}
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

const ManagerDashboard = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const { user, logout } = useContext(AuthContext); 
  const navigate = useNavigate();

  const [currentPosition, setCurrentPosition] = useState({ lat: 6.9271, lng: 79.8612 }); // Default position (Colombo)
  const [markers, setMarkers] = useState([{ lat: 6.9271, lng: 79.8612 }]); // Default marker at Colombo
  const [directions, setDirections] = useState(null);

  const data = [
    { name: 'Jan', value: 30 },
    { name: 'Feb', value: 45 },
    { name: 'Mar', value: 28 },
    { name: 'Apr', value: 55 },
    { name: 'May', value: 48 },
    { name: 'Jun', value: 60 },
    { name: 'Jul', value: 72 },
  ];

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

  
  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate('/login'); // Navigate to the login page
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Function to check if the user session is expired
  const isSessionExpired = () => {
    return !user; // assuming user is null or undefined when expired
  };

  useEffect(() => {
    console.log(user);
    const handleBeforeUnload = (event) => {
      if (isSessionExpired()) {
        event.preventDefault(); // Prevent the default action
        event.returnValue = ''; // For modern browsers, this will show a confirmation dialog
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [user]); // Re-run the effect when the user changes

  // Determine the active tab based on the current pathname
  const getLinkClassName = (path) => {
    return location.pathname === path 
      ? 'flex items-center px-6 py-2.5 text-white font-semibold border-b border-white transition duration-200' 
      : 'flex items-center px-6 py-2.5 text-white hover:text-orange-600 group transition duration-200';
  };
  

  return (
    <div className="flex min-h-screen font-roboto">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-br from-blue-overlay via-rebecca-purple to-orange-overlay bg-rebecca-purple shadow-xl rounded-r-xl">
        <div className="py-6 px-6 flex items-center justify-center">
          <Link to="/" className="flex items-center" style={{ textDecoration: 'none' }}>
            <h2 className="text-2xl font-semibold text-white ml-1">CompanyA</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="40"
              height="40"
              viewBox="0 0 30 30"
              fill="#ffffff"
              className="ml-3"
            >
              <path d="M20.752 10.993c0-.17-.05-.33-.13-.48l-2.77-5.02c-.46-.91-1.37-1.48-2.4-1.5-1.04-.02-1.98.54-2.44 1.4l-3.04 5.09c-.1.15-.15.33-.15.51h2.19 7H20.752zM14.752 6.373c.19-.35.53-.38.67-.38.13 0 .47.05.64.4.01.01.02.03.03.04l1.41 2.56h-4.31L14.752 6.373zM27.192 22.763l-1.54-2.77h-21.1l-1.62 2.71c-.8 1.5.31 3.29 2.04 3.29h20.14C26.812 25.993 27.922 24.263 27.192 22.763zM5.752 17.993L24.552 17.993 21.782 12.993 8.742 12.993z"></path>
            </svg>
          </Link>
        </div>
        <div className="flex items-center px-6 py-4 text-gray-200 mb-0 mt-6">
          <img
            className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 cursor-pointer"
            src="https://e0.pxfuel.com/wallpapers/868/286/desktop-wallpaper-margot-robbie-robbie-women-actress-margot.jpg"
            alt="Bordered avatar"
            onClick={openModal} 
          />
          <div className="ml-4">
            <p className="mb-0 font-semibold text-white cursor-pointer" onClick={openModal} >{user.username}</p>
            <p className="mb-1 text-sm text-gray-300 cursor-pointer" onClick={openModal} >{user.role}</p>
          </div>
        </div>

        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          >
            <div className="relative bg-white p-20 rounded-2xl shadow-lg flex space-x-10">
              {/* Profile Photo */}
              <div className="relative">
                <img
                  className="w-96 h-96 rounded-full object-cover"
                  src="https://e0.pxfuel.com/wallpapers/868/286/desktop-wallpaper-margot-robbie-robbie-women-actress-margot.jpg"
                  alt="Enlarged avatar"
                />

              </div>

              {/* Profile Details */}
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Profile Details</h2>
                <p className="text-lg text-gray-600">
                  <span className="font-bold">Username: </span>{user.username}
                </p>
                <p className="text-lg text-gray-600">
                  <span className="font-bold">Email: </span>{user.email}
                </p>
                <p className="text-lg text-gray-600">
                  <span className="font-bold">Role: </span>{user.role}
                </p>
                {/* You can add more details here */}
                <div className="mt-6">
                  <button
                    className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
                    onClick={closeModal} // Close modal on button click
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
          <h3 className="mx-6 mb-3 text-xs text-gray-300 uppercase tracking-widest">Admin</h3>
          <Link
            to="/manager"
            className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${
              isActive('/dashboard')
                ? 'bg-gradient-to-tr from-purple-700  to-blue-800 text-white'
                : 'text-gray-200 hover:bg-orange-100 hover:text-black'
            }`}
            style={{ textDecoration: 'none' }}
          >
            <AiFillDashboard className="h-5 w-5 mr-3" />
            Dashboard
          </Link>

          <Link
            to="/manager/orders"
            className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${
              isActive('/manager/orders')
                ? 'bg-gradient-to-tr from-purple-700  to-blue-800 text-white'
                : 'text-gray-200 hover:bg-orange-100 hover:text-black'
            }`}
            style={{ textDecoration: 'none' }}
          >
            <FaTruck className="h-5 w-5 mr-3" />
            Orders
          </Link>

          {/* <Link
            to="/manager/customers"
            className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${
              isActive('/manager/customers')
                ? 'bg-gradient-to-tr from-purple-700  to-blue-800 text-white'
                : 'text-gray-200 hover:bg-orange-100 hover:text-black'
            }`}
            style={{ textDecoration: 'none' }}
          >
            <IoIosPeople className="h-5 w-5 mr-3" />
            Customers
          </Link> */}

          <Link
            to="/manager/assignments"
            className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${
              isActive('/manager/assignments')
                ? 'bg-gradient-to-tr from-purple-700  to-blue-800 text-white'
                : 'text-gray-200 hover:bg-orange-100 hover:text-black'
            }`}
            style={{ textDecoration: 'none' }}
          >
            <MdAssignment className="h-5 w-5 mr-3" />
            Assignments
          </Link>

          <Link
            to="/manager/roster"
            className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${
              isActive('/manager/roster')
                ? 'bg-gradient-to-tr from-purple-700  to-blue-800 text-white'
                : 'text-gray-200 hover:bg-orange-100 hover:text-black'
            }`}
            style={{ textDecoration: 'none' }}
          >
            <IoIosPeople className="h-5 w-5 mr-3" />
            Rooster
          </Link>
        </div>
      </div>
  
      <div className="flex-1">
        <div className="flex justify-between py-3 px-6 bg-gray-50 border-b space-x-6">
          <form action="" className="w-full max-w-md">
            {/* Search form can go here */}
          </form>

          <div className="relative flex-shrink-0">
            <div className="rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
              {/* User avatar can go here, optional */}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-6">

          {location.pathname === '/manager' && (
            <div className="grid grid-cols-2 gap-6">
              <h2 className="text-4xl font-bold mb-1 text-gray-800">Dashboard</h2>
              <p className="text-lg font-bold mt-0 text-gray-400"></p>
              <div className="bg-white rounded-lg shadow-lg p-4 flex-auto">
              <h2 className="text-lg font-bold mb-4 text-gray-800">Performance Chart</h2>
              <div className="flex justify-center">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="0" stroke="#e0e0e0" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12, fill: '#555' }} 
                      axisLine={{ stroke: '#d0d0d0' }} 
                      tickLine={false} 
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: '#555' }} 
                      axisLine={{ stroke: '#d0d0d0' }} 
                      tickLine={false} 
                      allowDecimals={false}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}
                      labelStyle={{ fontWeight: 'bold', color: '#333' }}
                      itemStyle={{ color: '#555' }}
                    />
                    <defs>
                      <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9} />
                        <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.5} />
                      </linearGradient>
                      <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur"/>
                        <feOffset in="blur" dx="4" dy="4" result="offsetBlur"/>
                        <feMerge>
                          <feMergeNode in="offsetBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="url(#lineGradient)"
                      strokeWidth={4}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6, stroke: '#fff', filter: 'url(#shadow)' }}
                      activeDot={{ r: 8, fill: '#60a5fa', stroke: '#3b82f6', strokeWidth: 3, filter: 'url(#shadow)' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                  <Orders limit={4} /> 
                  <Link to="/manager/orders" className="text-blue-600 hover:underline mt-4 block">See More</Link>
                </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6">

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
                <div className="bg-white rounded-lg shadow-md p-4 shadow-lg">
                  <Customers limit={4} /> 
                  <Link to="/manager/customers" className="text-blue-600 hover:underline mt-4 block">See More</Link>
                </div>
              </div>
            </div>
          )}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard; 




