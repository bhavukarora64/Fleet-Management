// components/dashboardComponents/tirePressure.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build'; // Icon for repair
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports'; // Tire-like icon

// Replace 'carImageUrl' with the actual path or URL of your car image
const carImageUrl = 'https://www.freeiconspng.com/uploads/car-top-view-icon-3.png'; // Example URL

function TirePressure() {
  return (
    <Box sx={{ p: 0, display: 'flex', flexDirection: 'column', boxShadow: 2, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
        <BuildIcon sx={{ mr: 1, color: 'primary.main' }} /> {/* Repair icon next to the text */}
        Tire Pressure
      </Typography>
      <Box sx={{ position: 'relative', width: 400, height: 400 }}>
        <img 
          src={carImageUrl} 
          alt="Car" 
          style={{ 
            width: '50%', 
            height: '50%', 
            objectFit: 'contain', 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)' ,
            alignItems: 'center'
          }} 
        />

        {/* Front Left Tire */}
        <Box sx={{ position: 'absolute', top: '30%', left: '15%', textAlign: 'center' }}>
          <Typography variant="body2" color="textSecondary">Front Left</Typography>
          <Typography variant="h6" color="error.main">3.67 bar</Typography>
        </Box>

        {/* Front Right Tire */}
        <Box sx={{ position: 'absolute', top: '30%', right: '15%', textAlign: 'center' }}>
          <Typography variant="body2" color="textSecondary">Front Right</Typography>
          <Typography variant="h6" color="error.main">3.65 bar</Typography>
        </Box>

        {/* Rear Left Tire */}
        <Box sx={{ position: 'absolute', bottom: '30%', left: '15%', textAlign: 'center' }}>
          <Typography variant="body2" color="textSecondary">Rear Left</Typography>
          <Typography variant="h6" color="success.main">3.60 bar</Typography>
        </Box>

        {/* Rear Right Tire */}
        <Box sx={{ position: 'absolute', bottom: '30%', right: '15%', textAlign: 'center' }}>
          <Typography variant="body2" color="textSecondary">Rear Right</Typography>
          <Typography variant="h6" color="success.main">3.60 bar</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default TirePressure;
