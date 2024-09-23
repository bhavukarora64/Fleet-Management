// src/components/dashboardComponents/Alerts.jsx
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider, Box, Button } from '@mui/material';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant'; // Icon for alerts
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [visibleAlerts, setVisibleAlerts] = useState(3); // Start with 3 alerts visible

  const [searchParams] = useSearchParams(); // Hook to read URL parameters
  const vehicleId = searchParams.get('vehicleId'); // Get vehicleId from URL
  const userId = searchParams.get('userId'); // Get userId from URL

  useEffect(() => {
    const fetchAlerts = async () => {
      if (vehicleId && userId) { // Ensure both vehicleId and userId are available
        try {
          console.log('Fetching vehicle performance metrics...');
          const response = await axios.get('https://fleet-management-eta.vercel.app/vehicle/getVehiclePerformanceMetrics', {
            params: { vehicleId, userId }, // Pass both vehicleId and userId as parameters
          });

          const data = response.data;

          // Determine alerts based on the received data
          const newAlerts = [];
          if (data.metrics.isAggressiveAcceleration) {
            newAlerts.push({ id: 1, message: 'Aggressive Acceleration Detected', date: new Date().toLocaleString() });
          }
          if (data.metrics.isSpeeding) {
            newAlerts.push({ id: 2, message: 'Speeding Detected', date: new Date().toLocaleString() });
          }
          if (data.metrics.isSwerving) {
            newAlerts.push({ id: 3, message: 'Swerving Detected', date: new Date().toLocaleString() });
          }
          if (data.metrics.unstableMovement) {
            newAlerts.push({ id: 4, message: 'Unstable Movement Detected', date: new Date().toLocaleString() });
          }

          setAlerts(newAlerts);
        } catch (error) {
          console.error('Error fetching vehicle performance metrics:', error);
        }
      }
    };

    fetchAlerts();
  }, [vehicleId, userId]); // Fetch data when vehicleId or userId changes

  const handleShowMore = () => {
    setVisibleAlerts((prev) => Math.min(prev + 3, alerts.length));
  };

  return (
    <Card sx={{ mb: 2, borderRadius: 2, boxShadow: 3, height: 450, overflow: 'auto' }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <NotificationImportantIcon sx={{ mr: 1, color: 'error.main' }} />
          Current Alerts
        </Typography>
        <List>
          {alerts.slice(0, visibleAlerts).map((alert) => (
            <React.Fragment key={alert.id}>
              <ListItem>
                <ListItemText 
                  primary={alert.message} 
                  secondary={alert.date} 
                  primaryTypographyProps={{ variant: 'body1', sx: { fontWeight: 'bold' } }}
                  secondaryTypographyProps={{ variant: 'body2', sx: { color: 'text.secondary' }}}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
        {visibleAlerts < alerts.length && (
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Button variant="outlined" onClick={handleShowMore}>
              Show More
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default Alerts;
