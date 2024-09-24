import React, { useState, useEffect } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
} from '@mui/material';
import ElectricCarIcon from '@mui/icons-material/ElectricCar'; // Car icon
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'; // Another car icon as an example
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

function Sidebar(user) { // Correctly destructuring the user prop
  const [vehicles, setVehicles] = useState([]);
  const [userId, setUserId] = useState(user?.userId || ''); // Initialize with userId or an empty string
  
  const [open, setOpen] = useState(false);
  const [vehicleData, setVehicleData] = useState({
    license_plate: '',
    status: 'active',
    purchase_date: '',
    insurance_expiry: '',
    registration_expiry: '',
    make: '',
    model: '',
    year: '',
    color: '',
    mileage: '',
    registration_number: '',
  });
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    // Update userId if user prop changes
    if (user?.userId) {
      setUserId(user.userId);
    }
  }, [user]);

  useEffect(() => {
    if (userId) {
      const fetchVehicles = async () => {
        try {
          console.log('vehcile user id:', userId);
          const response = await axios.get('https://fleet-management-eta.vercel.app/vehicle/getvehicles', { params: { userId } });
          console.log('vehcile list:', response);
          setVehicles(response.data.vehicles);
        } catch (error) {
          console.error('Error fetching vehicles:', error);
        }
      };

      fetchVehicles();
    }
  }, [userId]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setVehicleData({ ...vehicleData, [e.target.name]: e.target.value });
  };


  const handleRegister = async () => {
    if (!userId) {
      console.error('User ID is not set'); // Debugging message
      return;
    }

    try {
      console.log('Registering vehicle for user:', userId); // Debugging message
      const response = await axios.post('https://fleet-management-eta.vercel.app/vehicle/register', {
        vehicleData,
        user_id: userId,
      });

      console.log(response.data)
      alert('Vehicle registered successfully!');
      setOpen(false);

    } catch (error) {
      console.error('Error registering vehicle:', error);
      alert('Error registering vehicle!');
    }
  };

  const handleVehicleSelect = (vehicleId) => {
    setSearchParams({ userId, vehicleId }); // Update URL with selected vehicleId
  };

  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: '#1976d2',
        color: '#ffffff',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        p: 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          color: '#ffffff',
        }}
      >
        <ElectricCarIcon sx={{ mr: 1, color: '#ffffff' }} />
        Registered Vehicles
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        sx={{ mt: 1, width: '100%', bgcolor: '#ff9800', '&:hover': { bgcolor: '#e68900' } }}
        onClick={handleClickOpen}
      >
        Register New Vehicle
      </Button>
      <List sx={{ flexGrow: 1 }}>
        {vehicles.map((vehicle) => (
          <ListItem button key={vehicle.vehicle_id} onClick={() => handleVehicleSelect(vehicle.vehicle_id)}>
            <ListItemIcon>
              <DirectionsCarIcon sx={{ color: '#ffffff' }} /> {/* Car icon */}
            </ListItemIcon>
            <ListItemText
              primary={`${vehicle.make} ${vehicle.model} (ID: ${vehicle.vehicle_id})`}
              sx={{ color: '#ffffff' }}
            />
          </ListItem>
        ))}
      </List>

      {/* Dialog for Vehicle Registration */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Register New Vehicle</DialogTitle>
        <DialogContent>
          {/* Add input fields for vehicle registration */}
          <TextField autoFocus margin="dense" name="license_plate" label="License Plate" fullWidth variant="outlined" onChange={handleChange} value={vehicleData.license_plate} />
          <TextField
            margin="dense"
            name="status"
            label="Status"
            fullWidth
            variant="outlined"
            select
            onChange={handleChange}
            value={vehicleData.status}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
            <MenuItem value="maintenance">Maintenance</MenuItem>
          </TextField>
          <TextField margin="dense" name="purchase_date" label="Purchase Date" type="date" fullWidth variant="outlined" InputLabelProps={{ shrink: true }} onChange={handleChange} value={vehicleData.purchase_date} />
          <TextField margin="dense" name="insurance_expiry" label="Insurance Expiry" type="date" fullWidth variant="outlined" InputLabelProps={{ shrink: true }} onChange={handleChange} value={vehicleData.insurance_expiry} />
          <TextField margin="dense" name="registration_expiry" label="Registration Expiry" type="date" fullWidth variant="outlined" InputLabelProps={{ shrink: true }} onChange={handleChange} value={vehicleData.registration_expiry} />
          <TextField margin="dense" name="make" label="Make" fullWidth variant="outlined" onChange={handleChange} value={vehicleData.make} />
          <TextField margin="dense" name="model" label="Model" fullWidth variant="outlined" onChange={handleChange} value={vehicleData.model} />
          <TextField margin="dense" name="year" label="Year" type="number" fullWidth variant="outlined" onChange={handleChange} value={vehicleData.year} />
          <TextField margin="dense" name="color" label="Color" fullWidth variant="outlined" onChange={handleChange} value={vehicleData.color} />
          <TextField margin="dense" name="mileage" label="Mileage" type="number" fullWidth variant="outlined" onChange={handleChange} value={vehicleData.mileage} />
          <TextField margin="dense" name="registration_number" label="Registration Number" fullWidth variant="outlined" onChange={handleChange} value={vehicleData.registration_number} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleRegister}>Register</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Sidebar;
