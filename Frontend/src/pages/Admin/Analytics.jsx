import React, { useRef } from 'react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// Sample data for the graphs
const salesData = [
  { month: 'Jan', revenue: 4000, orders: 2400 },
  { month: 'Feb', revenue: 3000, orders: 2210 },
  { month: 'Mar', revenue: 2000, orders: 2290 },
  { month: 'Apr', revenue: 2780, orders: 2000 },
  { month: 'May', revenue: 1890, orders: 2181 },
  { month: 'Jun', revenue: 2390, orders: 2500 },
  { month: 'Jul', revenue: 3490, orders: 2100 },
];

const pieData = [
  { name: 'Shipped', value: 400 },
  { name: 'Pending', value: 300 },
  { name: 'Delivered', value: 300 },
  { name: 'Cancelled', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Analytics = () => {
  const reportRef = useRef();

  // Function to generate the PDF report
  // const downloadReport = async () => {
  //   const pdf = new jsPDF('p', 'mm', 'a4');
  //   const pageWidth = pdf.internal.pageSize.getWidth();
  //   const pageHeight = pdf.internal.pageSize.getHeight();

  //   // Capture the report section as an image
  //   const canvas = await html2canvas(reportRef.current, { scale: 2 });
  //   const imgData = canvas.toDataURL('image/png');

  //   // Add image to the PDF
  //   pdf.addImage(imgData, 'PNG', 10, 10, pageWidth - 20, pageHeight - 20);
  //   pdf.save('Analytics_Report.pdf');
  // };

  return (
    <div className="p-6 space-y-8" ref={reportRef}>
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-4">SCMS Analytics</h2>

      {/* Sales Line Chart */}
      <div className="bg-white p-4 shadow-md rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Monthly Revenue & Orders</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="orders" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
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

      {/* Download Report Button */}
      <button
        // onClick={}
        className="mt-6 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300 ease-in-out cursor-pointer"
      >
        Download Report
      </button>
    </div>
  );
};

export default Analytics;


