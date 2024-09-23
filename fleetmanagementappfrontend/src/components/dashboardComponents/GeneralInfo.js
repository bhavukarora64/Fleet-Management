import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';  // Import useSearchParams

function GeneralInfo() {
  const [generalInfo, setGeneralInfo] = useState(null); // State to hold the data
  const [searchParams] = useSearchParams();  // Hook to read URL parameters
  const userId = searchParams.get('userId');  // Get userId from URL
  const vehicleId = searchParams.get('vehicleId');  // Get vehicleId from URL

  // Fetch data from the backend API
  useEffect(() => {
    if (userId && vehicleId) {  // Ensure both userId and vehicleId are available
      axios
        .get(`https://fleet-management-eta.vercel.app/vehicle/getvehicleData`, { 
          params: { 
            userId, 
            vehicleId 
          } 
        })
        .then((response) => {
          if (response.data && response.data.vehicle) {
            setGeneralInfo(response.data.vehicle);
          } else {
            console.error("No vehicle data found in the response");
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [userId, vehicleId]);

  if (!generalInfo) {
    return <Typography>No vehcile insights found !</Typography>; // Loading state
  }

  return (
    <Card sx={{ mb: 1, p: 2.5, boxShadow: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <InfoIcon sx={{ mr: 1, color: 'primary.main' }} /> General Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center' }}>
              <CalendarTodayIcon sx={{ mr: 1 }} /> Purchased on: {new Date(generalInfo.purchase_date).toLocaleString()}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center' }}>
              <DriveEtaIcon sx={{ mr: 1 }} /> VIN: {generalInfo.vehicle_id}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center' }}>
              <DriveEtaIcon sx={{ mr: 1 }} /> Make: {generalInfo.make}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center' }}>
              <DriveEtaIcon sx={{ mr: 1 }} /> Model: {generalInfo.model}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default GeneralInfo;
