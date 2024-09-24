import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import TimelineIcon from '@mui/icons-material/Timeline'; // Unstable movement icon
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const UnstableMovement = () => {
  const [unstableMovement, setUnstableMovement] = useState(null); // Use null for initial state
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(''); // Track error state

  const [searchParams] = useSearchParams(); // Hook to read URL parameters
  const vehicleId = searchParams.get('vehicleId'); // Get vehicleId from URL
  const userId = searchParams.get('userId'); // Get userId from URL

  useEffect(() => {
    const fetchData = async () => {
      if (vehicleId && userId) { // Ensure both vehicleId and userId are available
        try {
          console.log('Fetching unstable movement data...');
          const response = await axios.get('https://fleet-management-eta.vercel.app/vehicle/getVehiclePerformanceMetrics', {
            params: { vehicleId, userId }, // Pass both vehicleId and userId as parameters
          });

          const data = response.data;

          if (data.metrics) { // Check if metrics data is available
            setUnstableMovement(data.metrics.unstableMovement || 0); // Update with fetched data
            setError(''); // Clear error message on successful fetch
          } else {
            setError('No data available for unstable movement.'); // Set error message if no data
            setUnstableMovement(0); // Set default value for the display
          }
        } catch (error) {
          console.error('Error fetching unstable movement data:', error);
          setError('Error fetching unstable movement data.'); // Set error message
          setUnstableMovement(0); // Set default value in case of error
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
            <TimelineIcon sx={{ mr: 1, color: 'primary.main' }} />
            Unstable Movement
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
          <TimelineIcon sx={{ mr: 1, color: 'primary.main' }} />
          Unstable Movement
        </Typography>
        {error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Box sx={{ width: 100, height: 100 }}>
            <CircularProgressbar
              value={unstableMovement ? 100 : 0}
              text={unstableMovement ? 'Yes' : 'No'}
              styles={buildStyles({
                pathColor: unstableMovement ? '#f44336' : '#4caf50',
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

export default UnstableMovement;
