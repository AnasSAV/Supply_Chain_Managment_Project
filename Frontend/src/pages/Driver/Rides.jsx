import React, { useState, useEffect } from 'react';

const Rides = () => {
    // Sample data representing truck trips for the logged-in assistant with ID '12345'
    const [rides, setRides] = useState([
        {
            id: 'T001',
            route: 'City Center to Uptown',
            driver: 'John Doe',
            truck: 'Truck 12',
            date: '2024-10-25',
            time: '09:00 AM',
            assistantId: '12345'
        },
        {
            id: 'T002',
            route: 'Downtown to Suburbs',
            driver: 'Jane Smith',
            truck: 'Truck 15',
            date: '2024-10-26',
            time: '11:30 AM',
            assistantId: '12345'
        },
        {
            id: 'T003',
            route: 'North Point to East End',
            driver: 'Tom Brown',
            truck: 'Truck 21',
            date: '2024-10-27',
            time: '02:45 PM',
            assistantId: '12345'
        }
    ]);

    // Use effect to simulate component mounting
    useEffect(() => {
        // We would normally fetch data here, but for testing, we're using static sample data
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-teal-800">Your Truck Trips</h1>

            {rides.length === 0 ? (
                <p>No trips available for you.</p>
            ) : (
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead>
                        <tr>
                            <th className="py-3 px-4 border-b bg-gray-100">Trip ID</th>
                            <th className="py-3 px-4 border-b bg-gray-100">Route</th>
                            <th className="py-3 px-4 border-b bg-gray-100">Driver</th>
                            <th className="py-3 px-4 border-b bg-gray-100">Truck</th>
                            <th className="py-3 px-4 border-b bg-gray-100">Date</th>
                            <th className="py-3 px-4 border-b bg-gray-100">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rides.map(ride => (
                            <tr key={ride.id} className="hover:bg-gray-100 transition duration-200">
                                <td className="py-2 px-4 border-b text-gray-700">{ride.id}</td>
                                <td className="py-2 px-4 border-b text-gray-700">{ride.route}</td>
                                <td className="py-2 px-4 border-b text-gray-700">{ride.driver}</td>
                                <td className="py-2 px-4 border-b text-gray-700">{ride.truck}</td>
                                <td className="py-2 px-4 border-b text-gray-700">{ride.date}</td>
                                <td className="py-2 px-4 border-b text-gray-700">{ride.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Rides;