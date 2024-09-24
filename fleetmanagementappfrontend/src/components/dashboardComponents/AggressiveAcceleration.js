import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import WarningAmberIcon from '@mui/icons-material/WarningAmber'; // Aggressive acceleration icon
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const AggressiveAcceleration = () => {
  const [isAggressiveAcceleration, setIsAggressiveAcceleration] = useState(null); // Use null for initial state
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(''); // Track error state

  const [searchParams] = useSearchParams(); // Hook to read URL parameters
  const vehicleId = searchParams.get('vehicleId'); // Get vehicleId from URL
  const userId = searchParams.get('userId'); // Get userId from URL

  useEffect(() => {
    const fetchData = async () => {
      if (vehicleId && userId) { // Ensure both vehicleId and userId are available
        try {
          console.log('Fetching aggressive acceleration data...');
          const response = await axios.get('https://fleet-management-5eyg.vercel.app//vehicle/getVehiclePerformanceMetrics', {
            params: { vehicleId, userId }, // Pass both vehicleId and userId as parameters
          });

          const data = response.data;

          if (data.metrics) { // Check if metrics data is available
            setIsAggressiveAcceleration(data.metrics.isAggressiveAcceleration || 0); // Update with fetched data
            setError(''); // Clear error message on successful fetch
          } else {
            setError('No data available for aggressive acceleration.'); // Set error message if no data
            setIsAggressiveAcceleration(0); // Set default value for the display
          }
        } catch (error) {
          console.error('Error fetching aggressive acceleration data:', error);
          setError('Error fetching aggressive acceleration data.'); // Set error message
          setIsAggressiveAcceleration(0); // Set default value in case of error
        } finally {
          setLoading(false); // Set loading to false once data fetch is complete
        }
      } else {
        setError('Vehicle ID or User ID is missing.');
        setLoading(false);
      }
    };

    fetchData();
  }, [vehicleId, userId]); // Fetch data when vehicleId or userId changes

  if (loading) {
    return (
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <WarningAmberIcon sx={{ mr: 1, color: 'primary.main' }} />
            Aggressive Acceleration
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <CircularProgress />
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <WarningAmberIcon sx={{ mr: 1, color: 'primary.main' }} />
          Aggressive Acceleration
        </Typography>
        {error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Box sx={{ width: 100, height: 100 }}>
            <CircularProgressbar
              value={isAggressiveAcceleration ? 100 : 0}
              text={isAggressiveAcceleration ? 'Yes' : 'No'}
              styles={buildStyles({
                pathColor: isAggressiveAcceleration ? '#f44336' : '#4caf50',
                textColor: '#000',
                trailColor: '#d6d6d6',
              })}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default AggressiveAcceleration;
