// src/components/dashboardComponents/UnstableMovement.jsx
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import TimelineIcon from '@mui/icons-material/Timeline'; // Unstable movement icon
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const UnstableMovement = () => {
  const [unstableMovement, setUnstableMovement] = useState(0);

  const [searchParams] = useSearchParams(); // Hook to read URL parameters
  const vehicleId = searchParams.get('vehicleId'); // Get vehicleId from URL
  const userId = searchParams.get('userId'); // Get userId from URL

  useEffect(() => {
    const fetchData = async () => {
      if (vehicleId && userId) { // Ensure both vehicleId and userId are available
        try {
          console.log('Fetching unstable movement data...');
          const response = await axios.get('http://localhost:3001/vehicle/getVehiclePerformanceMetrics', {
            params: { vehicleId, userId }, // Pass both vehicleId and userId as parameters
          });

          const data = response.data;

          if (data.metrics) { // Check if metrics data is available
            setUnstableMovement(data.metrics.unstableMovement || 0); // Update with fetched data
          }
        } catch (error) {
          console.error('Error fetching unstable movement data:', error);
        }
      }
    };

    fetchData();
  }, [vehicleId, userId]); // Fetch data when vehicleId or userId changes

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <TimelineIcon sx={{ mr: 1, color: 'primary.main' }} />
          Unstable Movement
        </Typography>
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
      </CardContent>
    </Card>
  );
};

export default UnstableMovement;
