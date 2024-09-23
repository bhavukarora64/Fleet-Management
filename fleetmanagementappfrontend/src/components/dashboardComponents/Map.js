import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindow } from '@react-google-maps/api'; // Use MarkerF for flexibility
import { Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const containerStyle = {
  width: '100%',
  height: '450px',
};

const defaultCenter = { lat: 48.76647016649823, lng: 9.179729208861636 }; // Default center

const Map = () => {
  const [location, setLocation] = useState(defaultCenter); // State for vehicle location
  const [isMapLoaded, setIsMapLoaded] = useState(false); // Track if the map has loaded
  const [infoWindowOpen, setInfoWindowOpen] = useState(false); // State to control InfoWindow visibility
  const [searchParams] = useSearchParams(); // Hook to read URL parameters
  const vehicleId = searchParams.get('vehicleId'); // Get vehicleId from URL
  const userId = searchParams.get('userId'); // Get userId from URL

  useEffect(() => {
    const fetchVehicleLocation = async () => {
      if (vehicleId && userId) { // Ensure both vehicleId and userId are available
        try {
          const response = await axios.get('https://fleet-management-eta.vercel.app/vehicle/getVehiclePerformanceMetrics', {
            params: { vehicleId, userId }, // Pass both vehicleId and userId as parameters
          });

          if (response.data.metrics) { // Check if metrics data is available
            const { latitude, longitude } = response.data.metrics;

            if (!isNaN(latitude) && !isNaN(longitude)) { // Ensure latitude and longitude are valid
              setLocation({
                lat: parseFloat(latitude), // Convert latitude to float
                lng: parseFloat(longitude), // Convert longitude to float
              });
            }
          }
        } catch (error) {
          console.error('Error fetching vehicle location:', error);
        }
      }
    };

    fetchVehicleLocation();
  }, [vehicleId, userId]); // Fetch data when vehicleId or userId changes

  // Handle the map loading
  const onLoad = useCallback(() => {
    setIsMapLoaded(true); // Set to true when the map has loaded
  }, []);

  return (
    <Card className="map">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Vehicle Location
        </Typography>
        <div className="map-content">
          {/* Load Google Maps API */}
          <LoadScript googleMapsApiKey = {process.env.GOOGLE_MAPS_SECRET} >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={location} // Center the map on the vehicle location
              zoom={15} // Set zoom level
              onLoad={onLoad} // Map load handler
            >
              {isMapLoaded && (
                <>
                  {/* Marker for the vehicle location */}
                  <MarkerF
                    position={location} // Pinpoint the vehicle location
                    onClick={() => setInfoWindowOpen(true)} // Open InfoWindow on marker click
                    icon={{
                      url: "https://www.freeiconspng.com/uploads/car-top-view-icon-3.png", // URL for a car icon
                      scaledSize: new window.google.maps.Size(55, 65), // Ensure Size is accessed after google.maps is available
                    }}
                  />
                  {/* InfoWindow for the marker */}
                  {infoWindowOpen && (
                    <InfoWindow
                      position={location} // Position of InfoWindow
                      onCloseClick={() => setInfoWindowOpen(false)} // Close InfoWindow on close button click
                    >
                      <div>
                        <Typography variant="body1">Vehicle ID: {vehicleId}</Typography> {/* Display vehicleId */}
                      </div>
                    </InfoWindow>
                  )}
                </>
              )}
            </GoogleMap>
          </LoadScript>
        </div>
      </CardContent>
    </Card>
  );
};

export default Map;


{/* <LoadScript googleMapsApiKey="AIzaSyCS6s5EfSjff0Dv6SH5oogus0kui4hK4s8"> */}


