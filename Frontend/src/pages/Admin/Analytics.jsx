import React, { useRef, useEffect, useState } from 'react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import axios from 'axios';
import { toast } from 'react-toastify';

// Sample data for the graphs
const pieData = [
  { name: 'Shipped', value: 4 },
  { name: 'Pending', value: 13 },
  { name: 'Delivered', value: 14 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Analytics = () => {
  const reportRef = useRef();
  const [weeklyHours, setWeeklyHours] = useState([]);
  const [driverWeeklyHours, setDriverWeeklyHours] = useState([]);
  const [truckUsageHours, setTruckUsageHours] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const [quarterlySalesData, setQuarterlySalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingDrivers, setLoadingDrivers] = useState(true);
  const [loadingTrucks, setLoadingTrucks] = useState(true);
  const [loadingSales, setLoadingSales] = useState(true);
  const [loadingItems, setLoadingItems] = useState(true);
  const [loadingQuarterlySales, setLoadingQuarterlySales] = useState(true);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year

  // Fetch quarterly sales report for the selected year
  const fetchQuarterlySalesReport = async (year) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:3000/api/trainTrips/get-quarterly-sales-report?year=${year}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        setQuarterlySalesData(response.data.data);
      } else {
        toast.error('Failed to fetch quarterly sales data');
      }
    } catch (error) {
      console.error('Error fetching quarterly sales data:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch quarterly sales data');
    } finally {
      setLoadingQuarterlySales(false);
    }
  };

  // Fetch quarterly sales report on component mount
  useEffect(() => {
    fetchQuarterlySalesReport(selectedYear);
  }, [selectedYear]);

  // Fetch weekly working hours for assistants
  useEffect(() => {
    const fetchWeeklyWorkingHours = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
          'http://localhost:3000/api/trainTrips/get-weekly-working-hours',
          {},
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data.success) {
          setWeeklyHours(response.data.data);
        } else {
          toast.error('Failed to fetch weekly working hours');
        }
      } catch (error) {
        console.error('Error fetching weekly working hours:', error);
        toast.error(error.response?.data?.message || 'Failed to fetch weekly working hours');
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyWorkingHours();
  }, []);

  // Fetch weekly working hours for drivers
  useEffect(() => {
    const fetchWeeklyWorkingHoursDrivers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
          'http://localhost:3000/api/trainTrips/get-weekly-working-hours-drivers',
          {},
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data.success) {
          setDriverWeeklyHours(response.data.data);
        } else {
          toast.error('Failed to fetch weekly working hours for drivers');
        }
      } catch (error) {
        console.error('Error fetching weekly working hours for drivers:', error);
        toast.error(error.response?.data?.message || 'Failed to fetch weekly working hours for drivers');
      } finally {
        setLoadingDrivers(false);
      }
    };

    fetchWeeklyWorkingHoursDrivers();
  }, []);

  // Fetch total truck usage hours for this week
  useEffect(() => {
    const fetchTotalTruckUsageHours = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
          'http://localhost:3000/api/trainTrips/get-total-truck-usage-hours',
          {},
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data.success) {
          setTruckUsageHours(response.data.data);
        } else {
          toast.error('Failed to fetch total truck usage hours');
        }
      } catch (error) {
        console.error('Error fetching total truck usage hours:', error);
        toast.error(error.response?.data?.message || 'Failed to fetch total truck usage hours');
      } finally {
        setLoadingTrucks(false);
      }
    };

    fetchTotalTruckUsageHours();
  }, []);

  // Fetch sales data by cities and routes
  useEffect(() => {
    const fetchSalesByCitiesAndRoutes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'http://localhost:3000/api/trainTrips/get-sales-by-cities-and-routes',
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data.success) {
          setSalesData(response.data.data);
        } else {
          toast.error('Failed to fetch sales data');
        }
      } catch (error) {
        console.error('Error fetching sales data:', error);
        toast.error(error.response?.data?.message || 'Failed to fetch sales data');
      } finally {
        setLoadingSales(false);
      }
    };

    fetchSalesByCitiesAndRoutes();
  }, []);

  // Fetch items with most orders for the current year
  useEffect(() => {
    const fetchItemsWithMostOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'http://localhost:3000/api/trainTrips/get-items-with-most-orders',
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data.success) {
          setItemsData(response.data.data);
        } else {
          toast.error('Failed to fetch items data');
        }
      } catch (error) {
        console.error('Error fetching items data:', error);
        toast.error(error.response?.data?.message || 'Failed to fetch items data');
      } finally {
        setLoadingItems(false);
      }
    };

    fetchItemsWithMostOrders();
  }, []);

  return (
    <div className="p-6 space-y-8" ref={reportRef}>
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-4">SCMS Analytics</h2>

      {/* Year Selection for Quarterly Sales Report */}
      <div className="flex items-center mb-4">
        <label htmlFor="year-select" className="mr-2">Select Year:</label>
        <select
          id="year-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border rounded p-2"
        >
          {/* Generate year options dynamically */}
          {[...Array(10)].map((_, index) => {
            const year = new Date().getFullYear() - index; // Current year and previous 9 years
            return (
              <option key={year} value={year}>{year}</option>
            );
          })}
        </select>
        <button
          onClick={() => fetchQuarterlySalesReport(selectedYear)}
          className="ml-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Fetch Report
        </button>
      </div>

      {/* Quarterly Sales Line Chart */}
      <div className="bg-white p-4 shadow-md rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Quarterly Sales Report for {selectedYear}</h3>
        {loadingQuarterlySales ? (
          <div className="flex justify-center items-center h-24">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={quarterlySalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total_sales" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Order Status Pie Chart */}
      <div className="bg-white p-4 shadow-md rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Order Status Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Weekly Working Hours Table for Assistants */}
      <div className="bg-white p-4 shadow-md rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Weekly Working Hours (Assistants)</h3>
        {loading ? (
          <div className="flex justify-center items-center h-24">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left">
                <th className="py-3 px-4 border-b">Assistant Name</th>
                <th className="py-3 px-4 border-b">Total Hours</th>
              </tr>
            </thead>
            <tbody>
              {weeklyHours.length > 0 ? (
                weeklyHours.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{item.name}</td>
                    <td className="py-2 px-4 border-b">{item.hours}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-gray-600 text-center py-4">No working hours data available.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Weekly Working Hours Table for Drivers */}
      <div className="bg-white p-4 shadow-md rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Weekly Working Hours (Drivers)</h3>
        {loadingDrivers ? (
          <div className="flex justify-center items-center h-24">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left">
                <th className="py-3 px-4 border-b">Driver Name</th>
                <th className="py-3 px-4 border-b">Total Hours</th>
              </tr>
            </thead>
            <tbody>
              {driverWeeklyHours.length > 0 ? (
                driverWeeklyHours.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{item.name}</td>
                    <td className="py-2 px-4 border-b">{item.hours}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-gray-600 text-center py-4">No working hours data available for drivers.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Total Truck Usage Hours Table */}
      <div className="bg-white p-4 shadow-md rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Total Truck Usage Hours (This Week)</h3>
        {loadingTrucks ? (
          <div className="flex justify-center items-center h-24">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left">
                <th className="py-3 px-4 border-b">Truck ID</th>
                <th className="py-3 px-4 border-b">Total Trip Hours</th>
              </tr>
            </thead>
            <tbody>
              {truckUsageHours.length > 0 ? (
                truckUsageHours.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{item.truck_id}</td>
                    <td className="py-2 px-4 border-b">{item.total_trip_hours}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-gray-600 text-center py-4">No truck usage data available for this week.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Sales Data Table */}
      <div className="bg-white p-4 shadow-md rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Sales by Cities and Routes</h3>
        {loadingSales ? (
          <div className="flex justify-center items-center h-24">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left">
                <th className="py-3 px-4 border-b">City</th>
                <th className="py-3 px-4 border-b">Route</th>
                <th className="py-3 px-4 border-b">Total Sales</th>
              </tr>
            </thead>
            <tbody>
              {salesData.length > 0 ? (
                salesData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{item.city}</td>
                    <td className="py-2 px-4 border-b">{item.route}</td>
                    <td className="py-2 px-4 border-b">{item.total_sales}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-gray-600 text-center py-4">No sales data available.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Bar Graph for Items with Most Orders */}
      <div className="bg-white p-4 shadow-md rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Items with Most Orders (Current Year)</h3>
        {loadingItems ? (
          <div className="flex justify-center items-center h-24">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={itemsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product_name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total_count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Download Report Button */}
      <button
        // onClick={downloadReport}
        className="mt-6 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300 ease-in-out cursor-pointer"
      >
        Download Report
      </button>
    </div>
  );
};

export default Analytics;


