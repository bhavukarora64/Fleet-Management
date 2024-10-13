import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindow } from '@react-google-maps/api';
import { Card, CardContent, Typography, Box } from '@mui/material';
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
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(''); // Track error state
  const [searchParams] = useSearchParams(); // Hook to read URL parameters
  const vehicleId = searchParams.get('vehicleId'); // Get vehicleId from URL
  const userId = searchParams.get('userId'); // Get userId from URL

  useEffect(() => {
    const fetchVehicleLocation = async () => {
      if (vehicleId && userId) {
        try {
          const response = await axios.get('https://fleet-management-5eyg.vercel.app//vehicle/getVehiclePerformanceMetrics', {
            params: { vehicleId, userId },
          });

          if (response.data.metrics) {
            const { latitude, longitude } = response.data.metrics;

            if (!isNaN(latitude) && !isNaN(longitude)) {
              setLocation({
                lat: parseFloat(latitude),
                lng: parseFloat(longitude),
              });
              setError(''); // Clear error message on successful fetch
            } else {
              setError('Invalid location data received.'); // Handle invalid data
            }
          } else {
            setError('No location data available.'); // Handle missing data
          }
        } catch (error) {
          console.error('Error fetching vehicle location:', error);
          setError('Error fetching location details.'); // Set error message
        } finally {
          setLoading(false); // Set loading to false once data fetch is complete
        }
      } else {
        setLoading(false); // Set loading to false if vehicleId or userId is missing
      }
    };

    fetchVehicleLocation();
  }, [vehicleId, userId]);

  const onLoad = useCallback(() => {
    setIsMapLoaded(true);
  }, []);

  if (loading) {
    return (
      <Card className="map">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Vehicle Location
          </Typography>
          <Box sx={{ height: '450px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="body1">Loading map...</Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="map">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Vehicle Location
        </Typography>
        {error ? (
          <Box sx={{ height: '450px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="body1" color="error.main">
              {error}
            </Typography>
          </Box>
        ) : (
          <div className="map-content">
            <LoadScript googleMapsApiKey="<API KEY GOES HERE>">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={location}
                zoom={15}
                onLoad={onLoad}
              >
                {isMapLoaded && (
                  <>
                    <MarkerF
                      position={location}
                      onClick={() => setInfoWindowOpen(true)}
                      icon={{
                        url: "https://www.freeiconspng.com/uploads/car-top-view-icon-3.png",
                        scaledSize: new window.google.maps.Size(55, 65),
                      }}
                    />
                    {infoWindowOpen && (
                      <InfoWindow
                        position={location}
                        onCloseClick={() => setInfoWindowOpen(false)}
                      >
                        <div>
                          <Typography variant="body1">Vehicle ID: {vehicleId}</Typography>
                        </div>
                      </InfoWindow>
                    )}
                  </>
                )}
              </GoogleMap>
            </LoadScript>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Map;


// googleMapsApiKey="AIzaSyCS6s5EfSjff0Dv6SH5oogus0kui4hK4s8">
