import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register required components for ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Report = () => {
  // Test data for demonstration
  const testData = {
    totalVehicles: 50,
    activeVehicles: 35,
    inactiveVehicles: 15,
    totalDistance: 12000, // in km
    averageFuelConsumption: 7.5, // in liters per 100km
    vehiclesUnderMaintenance: 5,
    vehiclesWithIssues: 2,
  };

  // Data for bar chart - Active vs Inactive Vehicles
  const vehicleStatusData = {
    labels: ['Active Vehicles', 'Inactive Vehicles'],
    datasets: [
      {
        label: 'Number of Vehicles',
        data: [testData.activeVehicles, testData.inactiveVehicles],
        backgroundColor: ['#4caf50', '#f44336'],
      },
    ],
  };

  // Data for pie chart - Vehicle Maintenance Status
  const maintenanceData = {
    labels: ['Under Maintenance', 'With Issues', 'Operational'],
    datasets: [
      {
        label: 'Vehicle Status',
        data: [testData.vehiclesUnderMaintenance, testData.vehiclesWithIssues, testData.totalVehicles - testData.vehiclesUnderMaintenance - testData.vehiclesWithIssues],
        backgroundColor: ['#ff9800', '#f44336', '#4caf50'],
        hoverOffset: 4,
      },
    ],
  };

  // Data for bar chart - Fuel Consumption
  const fuelConsumptionData = {
    labels: ['Average Fuel Consumption (L/100km)'],
    datasets: [
      {
        label: 'Fuel Consumption',
        data: [testData.averageFuelConsumption],
        backgroundColor: ['#2196f3'],
      },
    ],
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Quick Report
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Vehicle Status
              </Typography>
              <Bar data={vehicleStatusData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Maintenance Overview
              </Typography>
              <Pie data={maintenanceData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Fuel Consumption
              </Typography>
              <Bar data={fuelConsumptionData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Report;
