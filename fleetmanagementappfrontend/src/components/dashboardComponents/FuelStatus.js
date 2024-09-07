// src/components/dashboardComponents/FuelStatus.jsx
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; // Import default styles
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation'; // Fuel pump icon

function FuelStatus() {
  const fuelPercentage = 12; // Example fuel percentage

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 9.5, display: 'flex', alignItems: 'center' }}>
          <LocalGasStationIcon sx={{ mr: 1, color: 'primary.main' }} /> {/* Icon next to the text */}
          Fuel Status
        </Typography>
        <Box sx={{ position: 'relative', width: 400, height: 300, display: 'flex' }}>
          {/* Circular Progress Bar */}
          <CircularProgressbar
            value={fuelPercentage}
            text={`${fuelPercentage}%`}
            styles={buildStyles({
              pathColor: `#4caf50`, // Color of the progress bar
              textColor: '#000',   // Color of the text
              trailColor: '#d6d6d6', // Color of the trail
            })}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default FuelStatus;
