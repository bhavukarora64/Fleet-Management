import React, { useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import Sidebar from './dashboardComponents/Sidebar';
import GeneralInfo from './dashboardComponents/GeneralInfo';
import Alerts from './dashboardComponents/Alerts';
import MapView from './dashboardComponents/Map';
import VehicleInfo from './dashboardComponents/VehicleInfo';
import TirePressure from './dashboardComponents/TirePressure';
import FuelStatus from './dashboardComponents/FuelStatus';
import AggressiveAcceleration from './dashboardComponents/AggressiveAcceleration';
import Speeding from './dashboardComponents/Speeding';
import Swerving from './dashboardComponents/Swerving';
import UnstableMovement from './dashboardComponents/UnstableMovement';
import { useAuth } from '../context/AuthContext'; // Import useAuth

function Dashboard() {
  const { userId, login } = useAuth(); // Access userId and login from AuthContext

  // useEffect to handle login based on userId
  useEffect(() => {
    if (userId) {
      login(userId); // Ensure login is called only when userId is available
    }
  }, [userId, login]); // Dependency array ensures this runs when userId or login changes

  return (
    <Grid container spacing={2}>
      {/* Sidebar */}
      <Grid item xs={3} sx={{ bgcolor: '#1976d2', color: '#ffffff', height: '190vh' }}>
        <Sidebar userId={userId} /> {/* Pass userId to Sidebar */}
      </Grid>
      
      {/* Main Content */}
      <Grid item xs={9}>
        <Box sx={{ p: 2, bgcolor: '#f9f9f9', minHeight: '100vh' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <GeneralInfo />
            </Grid>
            <Grid item xs={12} md={6}>
              <VehicleInfo />
            </Grid>
            <Grid item xs={12}>
              <MapView />
            </Grid>
            <Grid item xs={12} md={4}>
              <TirePressure />
            </Grid>
            <Grid item xs={12} md={4}>
              <FuelStatus />
            </Grid>
            <Grid item xs={12} md={4}>
              <Alerts />
            </Grid>
            <Grid item xs={12} md={4}>
              <Swerving />
            </Grid>
            <Grid item xs={12} md={4}>
              <Speeding />
            </Grid>
            <Grid item xs={12} md={4}>
              <AggressiveAcceleration />
            </Grid>
            <Grid item xs={12} md={4}>
              <UnstableMovement />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
