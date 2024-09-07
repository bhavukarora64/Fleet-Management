// src/controllers/dashboard.js
const mysql = require('mysql2/promise');
require('dotenv').config();

// MySQL connection configuration
const dbConfig = {
  host: 'mysql-ce25c8b-hft-5b3f.j.aivencloud.com',
  port: 10690,
  user: 'avnadmin',
  password: process.env.MYSQL_DATABASE_SECRET, // Use environment variable
  database: 'FleetManagement'
};

// Function to get vehicle performance data
async function getVehiclePerformanceData(req, res) {
  const { userId, vehicleId } = req.query;

  if (!userId || !vehicleId) {
    return res.status(400).json({ error: 'User ID and Vehicle ID are required.' });
  }

  try {
    // Connect to MySQL
    const connection = await mysql.createConnection(dbConfig);
    
    // Construct and execute the SQL query
    const [rows] = await connection.execute(
      'SELECT * FROM VehiclePerformanceMetrics WHERE user_id = ? AND vehicle_id = ? ORDER BY lastUpdated DESC',
      [userId, vehicleId]
    );

    await connection.end();

    // Send data as JSON
    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).json({ message: 'No data found for the given user ID and vehicle ID.' });
    }
  } catch (error) {
    console.error('Error fetching vehicle performance data:', error);
    res.status(500).json({ error: 'Failed to fetch data from the database.' });
  }
}

module.exports = { getVehiclePerformanceData };
