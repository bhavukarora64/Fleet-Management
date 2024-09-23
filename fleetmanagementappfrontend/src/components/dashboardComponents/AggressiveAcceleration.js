// src/components/dashboardComponents/AggressiveAcceleration.jsx
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import WarningAmberIcon from '@mui/icons-material/WarningAmber'; // Aggressive acceleration icon
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const AggressiveAcceleration = () => {
  const [isAggressiveAcceleration, setIsAggressiveAcceleration] = useState(0);

  const [searchParams] = useSearchParams(); // Hook to read URL parameters
  const vehicleId = searchParams.get('vehicleId'); // Get vehicleId from URL
  const userId = searchParams.get('userId'); // Get userId from URL

  useEffect(() => {
    const fetchData = async () => {
      if (vehicleId && userId) { // Ensure both vehicleId and userId are available
        try {
          console.log('Fetching aggressive acceleration data...');
          const response = await axios.get('https://fleet-management-eta.vercel.app/vehicle/getVehiclePerformanceMetrics', {
            params: { vehicleId, userId }, // Pass both vehicleId and userId as parameters
          });

          const data = response.data;

          if (data.metrics) { // Check if metrics data is available
            setIsAggressiveAcceleration(data.metrics.isAggressiveAcceleration || 0); // Update with fetched data
          }
        } catch (error) {
          console.error('Error fetching aggressive acceleration data:', error);
        }
      }
    };

    fetchData();
  }, [vehicleId, userId]); // Fetch data when vehicleId or userId changes

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <WarningAmberIcon sx={{ mr: 1, color: 'primary.main' }} />
          Aggressive Acceleration
        </Typography>
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
      </CardContent>
    </Card>
  );
};

export default AggressiveAcceleration;
