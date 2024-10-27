// src/components/OrderMap.js

import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

const OrderMap = () => {
  return (
    <MapContainer center={[7.8731, 80.7718]} zoom={7} style={{ height: '600px', width: '100%' }}> {/* Increased height and centered on Sri Lanka */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
};

export default OrderMap;


