import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AssistantOrders = () => {
    const [rides, setRides] = useState([]);

    useEffect(() => {
        // Fetch rides data from an API or database
        axios.get('/api/rides')
            .then(response => {
                setRides(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the rides!', error);
            });
    }, []);

    return (
        <div>
            <h1>Driver Orders</h1>
            {rides.length === 0 ? (
                <p>No rides available.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Ride ID</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Pickup Location</th>
                            <th>Dropoff Location</th>
                            <th>Assistant</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rides.map(ride => (
                            <tr key={ride.id}>
                                <td>{ride.id}</td>
                                <td>{ride.date}</td>
                                <td>{ride.time}</td>
                                <td>{ride.pickupLocation}</td>
                                <td>{ride.dropoffLocation}</td>
                                <td>{ride.assistant}</td>
                                <td>{ride.details}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AssistantOrders;