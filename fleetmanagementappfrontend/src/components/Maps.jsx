import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindow } from '@react-google-maps/api';
import { Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Import useAuth for userId

const containerStyle = {
  width: '100%',
  height: '800px',
};

const defaultCenter = { lat: 48.76647016649823, lng: 9.179729208861636 }; // Default center

const Maps = () => {
  const [vehicles, setVehicles] = useState([]); // State for vehicle data
  const [selectedVehicle, setSelectedVehicle] = useState(null); // State to track the selected vehicle for InfoWindow
  const [isMapLoaded, setIsMapLoaded] = useState(false); // Track if the map has loaded
  const { userId } = useAuth(); // Get userId from AuthContext

  // Function to fetch vehicle details
  const fetchVehicles = async () => {
    if (userId) {
      try {
        const response = await axios.get('https://fleet-management-eta.vercel.app/vehicle/getvehicles', {
          params: { userId },
        });

        if (response.data.vehicles) {
          const vehiclesData = response.data.vehicles;

          // Fetch locations for each vehicle separately
          const locationPromises = vehiclesData.map(async (vehicle) => {
            try {
              const locationResponse = await axios.get('https://fleet-management-eta.vercel.app/vehicle/getVehiclePerformanceMetrics', {
                params: { vehicleId: vehicle.vehicle_id, userId },
              });
              return {
                ...vehicle,
                latitude: locationResponse.data.metrics.latitude,
                longitude: locationResponse.data.metrics.longitude,
              };
            } catch (error) {
              console.error(`Error fetching location for vehicle ${vehicle.vehicle_id}:`, error);
              return null; // Return null if there is an error
            }
          });

          // Wait for all promises to resolve
          const vehiclesWithLocation = (await Promise.all(locationPromises)).filter(
            (vehicle) => vehicle !== null // Filter out null responses
          );

          setVehicles(vehiclesWithLocation);
        }
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [userId]);

  const onLoad = useCallback(() => {
    setIsMapLoaded(true);
  }, []);

  return (
    <Card className="maps">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Vehicle Locations
        </Typography>
        <div className="map-content">
          <LoadScript googleMapsApiKey="AIzaSyCS6s5EfSjff0Dv6SH5oogus0kui4hK4s8">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={defaultCenter}
              zoom={12}
              onLoad={onLoad}
            >
              {isMapLoaded &&
                vehicles.map((vehicle) => (
                  <MarkerF
                    key={vehicle.vehicle_id}
                    position={{ lat: parseFloat(vehicle.latitude), lng: parseFloat(vehicle.longitude) }}
                    onClick={() => setSelectedVehicle(vehicle)} // Set selected vehicle on marker click
                    icon={{
                      url: "https://www.freeiconspng.com/uploads/car-top-view-icon-3.png",
                      scaledSize: new window.google.maps.Size(55, 65),
                    }}
                  />
                ))}
              {selectedVehicle && (
                <InfoWindow
                  position={{ lat: parseFloat(selectedVehicle.latitude), lng: parseFloat(selectedVehicle.longitude) }}
                  onCloseClick={() => setSelectedVehicle(null)} // Close InfoWindow
                >
                  <div>
                    <Typography variant="body1">Vehicle ID: {selectedVehicle.vehicle_id}</Typography>
                    <Typography variant="body2">Make: {selectedVehicle.make}</Typography>
                    <Typography variant="body2">Model: {selectedVehicle.model}</Typography>
                    {/* Add more vehicle details if needed */}
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
        </div>
      </CardContent>
    </Card>
  );
};

export default Maps;
