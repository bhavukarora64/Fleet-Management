import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Vehicles.css';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(''); // Track error state

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('/api/vehicles');
        setVehicles(response.data);
        setError(''); // Clear error message on successful fetch
      } catch (error) {
        console.error('Error fetching vehicles', error);
        setError('Error fetching vehicle details.'); // Set error message
      } finally {
        setLoading(false); // Set loading to false once data fetch is complete
      }
    };

    fetchVehicles();
  }, []);

  if (loading) {
    return (
      <div className="vehicles">
        <h2>Vehicles</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="vehicles">
      <h2>Vehicles</h2>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <ul>
          {vehicles.length > 0 ? (
            vehicles.map(vehicle => (
              <li key={vehicle.id}>{vehicle.name}</li>
            ))
          ) : (
            <p>No vehicles available.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Vehicles;
