// components/vehicles.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Vehicles.css';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('/api/vehicles');
        setVehicles(response.data);
      } catch (error) {
        console.error('Error fetching vehicles', error);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <div className="vehicles">
      <h2>Vehicles</h2>
      <ul>
        {vehicles.map(vehicle => (
          <li key={vehicle.id}>{vehicle.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Vehicles;
