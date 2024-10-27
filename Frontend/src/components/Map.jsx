import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, InfoWindow, DirectionsRenderer } from "react-google-maps";
import { useLoadScript } from "@react-google-maps/api";

const libraries = ["places"]; // For places autocomplete

const Map = () => {
  const [currentPosition, setCurrentPosition] = useState({ lat: 6.9271, lng: 79.8612 });
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [directions, setDirections] = useState(null);
  const [markers, setMarkers] = useState([{ lat: 6.9271, lng: 79.8612 }]); // Default marker at Colombo

  // Load the Google Maps API script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCJDIGEYdFQRCcM7Fg4QEE6N6YfUpPjnTg", // Replace with your actual API key
    libraries,
  });

  // Get user's current position
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          console.error("Error getting user location");
        }
      );
    }
  }, []);

  // Handle marker click to show info window
  const handleMarkerClick = (marker) => {
    setSelectedPlace(marker);
  };

  // Handle map click to add a new marker
  const handleMapClick = (event) => {
    const newMarker = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
  };

  // Get directions between two locations
  const getDirections = (origin, destination) => {
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={currentPosition}
      onClick={handleMapClick} // Add marker on map click
      options={{
        zoomControl: true,
        mapTypeControl: true, // Enable map type control (e.g., Satellite, Terrain)
        streetViewControl: true,
        fullscreenControl: true,
      }}
    >
      {/* Render the user's current position marker */}
      <Marker position={currentPosition} />

      {/* Render all markers */}
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker}
          onClick={() => handleMarkerClick(marker)} // Open info window on marker click
          draggable // Allow markers to be dragged
        />
      ))}

      {/* Show an info window when a marker is clicked */}
      {selectedPlace && (
        <InfoWindow
          position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
          onCloseClick={() => setSelectedPlace(null)}
        >
          <div>
            <h3>Selected Location</h3>
            <p>Latitude: {selectedPlace.lat}</p>
            <p>Longitude: {selectedPlace.lng}</p>
          </div>
        </InfoWindow>
      )}

      {/* Render directions if available */}
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

export default Map;


