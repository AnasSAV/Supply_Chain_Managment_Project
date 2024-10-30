import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

const AssistantRides = () => {
    const [rides, setRides] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date)) return 'Invalid Date';
            
            const options = { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric'
            };
            return date.toLocaleDateString('en-US', options);
        } catch (error) {
            console.error('Date formatting error:', error);
            return dateString; // Return original string if formatting fails
        }
    };

    useEffect(() => {
        const fetchCompletedTrips = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(
                    'http://localhost:3000/api/assistants/get-assistant-completed-trip-details',
                    {
                        assistant_id: user.id
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                setRides(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Error fetching completed trips:', error);
                toast.error('Failed to fetch trips');
            } finally {
                setLoading(false);
            }
        };

        if (user && user.id) {
            fetchCompletedTrips();
        }
    }, [user]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-teal-800">Your Completed Truck Trips</h1>

            {rides.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <p className="text-gray-600">No completed trips available.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead>
                            <tr>
                                <th className="py-3 px-4 border-b bg-gray-100">Trip ID</th>
                                <th className="py-3 px-4 border-b bg-gray-100">Route</th>
                                <th className="py-3 px-4 border-b bg-gray-100">Driver</th>
                                <th className="py-3 px-4 border-b bg-gray-100">Truck</th>
                                <th className="py-3 px-4 border-b bg-gray-100">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rides.map((ride) => (
                                <tr key={ride.truck_trip_id} className="hover:bg-gray-100 transition duration-200">
                                    <td className="py-2 px-4 border-b text-gray-700">
                                        {ride.truck_trip_id}
                                    </td>
                                    <td className="py-2 px-4 border-b text-gray-700">
                                        {ride.route_name}
                                    </td>
                                    <td className="py-2 px-4 border-b text-gray-700">
                                        {ride.name}
                                    </td>
                                    <td className="py-2 px-4 border-b text-gray-700">
                                        {ride.truck_id}
                                    </td>
                                    <td className="py-2 px-4 border-b text-gray-700">
                                        {formatDate(ride.date)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AssistantRides;


