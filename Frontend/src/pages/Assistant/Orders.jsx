import React, { useState } from 'react';

const AssistantOrders = () => {
    const [rides, setRides] = useState([
        {
            orderId: 'R123',
            customerId: 'C001',
            customerContact: '+1 234 567 890',
        },
        {
            orderId: 'R124',
            customerId: 'C002',
            customerContact: '+1 987 654 321',
        },
    ]);

    const handleConfirmOrder = (rideId) => {
        console.log(`Order ${rideId} confirmed.`);
    };

    const handleReturnOrder = (rideId) => {
        console.log(`Order ${rideId} marked as returned.`);
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Orders</h1>
            {rides.length === 0 ? (
                <p className="text-gray-600">No rides available.</p>
            ) : (
                <div className="overflow-x-auto shadow-lg rounded-2xl">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg ">
                        <thead className="bg-gradient-to-r from-gray-700 to-gray-900 text-white">
                            <tr>
                                <th className="p-4 text-left">Order ID</th>
                                <th className="p-4 text-left">Customer ID</th>
                                <th className="p-4 text-left">Contact Number</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rides.map((ride) => (
                                <tr key={ride.id} className="border-b hover:bg-gray-100 transition duration-300 ease-in-out">
                                    <td className="p-4">{ride.orderId}</td>
                                    <td className="p-4">{ride.customerId}</td>
                                    <td className="p-4">{ride.customerContact}</td>
                                    <td className="p-4 flex gap-2 justify-center">
                                        <button
                                            onClick={() => handleConfirmOrder(ride.id)}
                                            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition duration-300"
                                        >
                                            Confirm Order
                                        </button>
                                        <button
                                            onClick={() => handleReturnOrder(ride.id)}
                                            className="bg-gradient-to-r from-rose-500 via-pink-600 to-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300"
                                        >
                                            Return Order
                                        </button>
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

export default AssistantOrders;

