import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, Grid, CircularProgress } from '@mui/material';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import SpeedIcon from '@mui/icons-material/Speed';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import OpacityIcon from '@mui/icons-material/Opacity';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const VehicleInfo = () => {
  const [vehicleData, setVehicleData] = useState({
    kilometers: 0,
    remainingAutonomy: 0,
    coolantTemperature: 0,
    adBlueLevel: 0,
    oilLevel: 0,
  });

  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(''); // Track error state

  const [searchParams] = useSearchParams(); // Hook to read URL parameters
  const vehicleId = searchParams.get('vehicleId'); // Get vehicleId from URL
  const userId = searchParams.get('userId'); // Get userId from URL

  useEffect(() => {
    const fetchVehiclePerformanceMetrics = async () => {
      if (vehicleId && userId) { // Ensure both vehicleId and userId are available
        try {
          console.log('Fetching vehicle performance metrics...');
          const response = await axios.get('https://fleet-management-eta.vercel.app/vehicle/getVehiclePerformanceMetrics', {
            params: { vehicleId, userId }, // Pass both vehicleId and userId as parameters
          });

          const data = response.data;

          if (data.metrics) { // Check if metrics data is available
            setVehicleData({
              kilometers: data.metrics.tripDistance || 0, // Update with fetched data
              remainingAutonomy: data.metrics.remainingAutonomy || 0,
              coolantTemperature: data.metrics.coolantTemperature || 0,
              adBlueLevel: data.metrics.adBlueLevel || 0,
              oilLevel: data.metrics.oilLevel || 0,
            });
            setError(''); // Clear error message on successful fetch
          } else {
            setError('No data available for this vehicle.'); // Set error message if no data
          }
        } catch (error) {
          console.error('Error fetching vehicle performance metrics:', error);
          setError('Error fetching vehicle details.'); // Set error message
        } finally {
          setLoading(false); // Set loading to false once data fetch is complete
        }
      } else {
        setError('Vehicle ID or User ID is missing.');
        setLoading(false);
      }
    };

    fetchVehiclePerformanceMetrics();
  }, [vehicleId, userId]); // Fetch data when vehicleId or userId changes

  if (loading) {
    return (
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Vehicle Information</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
            <CircularProgress />
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Vehicle Information
        </Typography>
        {error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocalGasStationIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="body1">Kilometers:</Typography>
                <Typography variant="body1" sx={{ ml: 1, fontWeight: 'bold' }}>
                  {vehicleData.kilometers} km
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SpeedIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="body1">Remaining Autonomy:</Typography>
                <Typography variant="body1" sx={{ ml: 1, fontWeight: 'bold' }}>
                  {vehicleData.remainingAutonomy} km
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ThermostatIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="body1">Coolant Temperature:</Typography>
                <Typography variant="body1" sx={{ ml: 1, fontWeight: 'bold' }}>
                  {vehicleData.coolantTemperature}°C
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <BatteryChargingFullIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="body1">AD Blue Level:</Typography>
                <Typography variant="body1" sx={{ ml: 1, fontWeight: 'bold' }}>
                  {vehicleData.adBlueLevel}%
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <OpacityIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="body1">Oil Level:</Typography>
                <Typography variant="body1" sx={{ ml: 1, fontWeight: 'bold' }}>
                  {vehicleData.oilLevel}%
                </Typography>
              </Box>
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};

export default VehicleInfo;
