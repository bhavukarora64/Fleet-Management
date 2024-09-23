// src/components/dashboardComponents/Speeding.jsx
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import SpeedIcon from '@mui/icons-material/Speed'; // Speeding icon
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Speeding = () => {
  const [isSpeeding, setIsSpeeding] = useState(0);

  const [searchParams] = useSearchParams(); // Hook to read URL parameters
  const vehicleId = searchParams.get('vehicleId'); // Get vehicleId from URL
  const userId = searchParams.get('userId'); // Get userId from URL

  useEffect(() => {
    const fetchData = async () => {
      if (vehicleId && userId) { // Ensure both vehicleId and userId are available
        try {
          console.log('Fetching speeding data...');
          const response = await axios.get('https://fleet-management-eta.vercel.app/vehicle/getVehiclePerformanceMetrics', {
            params: { vehicleId, userId }, // Pass both vehicleId and userId as parameters
          });

          const data = response.data;

          if (data.metrics) { // Check if metrics data is available
            setIsSpeeding(data.metrics.isSpeeding || 0); // Update with fetched data
          }
        } catch (error) {
          console.error('Error fetching speeding data:', error);
        }
      }
    };

    fetchData();
  }, [vehicleId, userId]); // Fetch data when vehicleId or userId changes

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <SpeedIcon sx={{ mr: 1, color: 'primary.main' }} />
          Speeding
        </Typography>
        <Box sx={{ width: 100, height: 100 }}>
          <CircularProgressbar
            value={isSpeeding ? 100 : 0}
            text={isSpeeding ? 'Yes' : 'No'}
            styles={buildStyles({
              pathColor: isSpeeding ? '#f44336' : '#4caf50',
              textColor: '#000',
              trailColor: '#d6d6d6',
            })}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default Speeding;
