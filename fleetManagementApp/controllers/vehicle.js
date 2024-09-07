const { v4: uuidv4 } = require('uuid'); // For generating unique identifiers
const connectToMySQL = require('../helperScripts/mysqlDB'); // Import MySQL connection function
const fs = require('fs').promises; // Use fs.promises for asynchronous file operations
const path = require('path');

exports.registerVehicle = async (req, res) => {
  try {
    
    const user_id = req.body.user_id;
    const vehicleData = req.body.vehicleData; // Extract user_id and vehicleData from request body
    console.log(user_id)
    if (!user_id || !vehicleData) {
      console.error('Invalid user_id or vehicleData');
      return res.status(400).json({ error: 'Invalid user_id or vehicleData' });
    }

    // Generate a new vehicle ID
    const newVehicleId = uuidv4();

    // Create directory structure for the vehicle
    const baseDir = 'C:/Users/BhavukArora/Documents/Azure Repo/5g-masterarbeit/fleetManagementApp/listedCars'; // Ensure this path is valid
    const userDirectoryPath = path.resolve(baseDir, user_id, newVehicleId);

    try {
      // Create directory using fs.promises
      await fs.mkdir(userDirectoryPath, { recursive: true });
      console.log(`Directory created at: ${userDirectoryPath}`);

      try {
        // Insert vehicle data into MySQL database
        const [result] = await connectToMySQL.query(`
          INSERT INTO Vehicle (vehicle_id, user_id, license_plate, status, purchase_date, insurance_expiry, registration_expiry, make, model, year, color, mileage, registration_number)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          newVehicleId, // Vehicle ID
          user_id, // User ID
          vehicleData.license_plate,
          vehicleData.status,
          vehicleData.purchase_date,
          vehicleData.insurance_expiry,
          vehicleData.registration_expiry,
          vehicleData.make,
          vehicleData.model,
          vehicleData.year,
          vehicleData.color,
          vehicleData.mileage,
          vehicleData.registration_number
        ]);

        if (result.affectedRows === 1) {
          return res.status(200).json({ message: 'Vehicle registered successfully', vehicleId: newVehicleId });
        } else {
          return res.status(500).json({ error: 'Failed to register vehicle in database' });
        }
      } catch (dbError) {
        console.error('Database insertion error:', dbError);
        return res.status(500).json({ error: 'Server error while saving vehicle data' });
      }

    } catch (mkdirError) {
      console.error('Error creating user directory:', mkdirError);
      return res.status(500).json({ error: 'Error creating user directory' });
    }
  } catch (error) {
    console.error('Vehicle registration error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Fetch list of vehicles for a user
  exports.getUserVehicles = async (req, res) => {
    
    const userId = req.query.userId; // Get user ID from request parameters
    console.log(userId);
    console.log('Incoming vehicle registration request:', req.body);
  
    try {
      // Fetch all vehicles for the given user ID
      const [rows] = await connectToMySQL.query('SELECT vehicle_id, make, model FROM Vehicle WHERE user_id = ?', [userId]);
  
      if (!rows.length) {
        return res.status(404).json({ msg: 'No vehicles found for this user.' });
      }
  
      return res.status(200).json({ vehicles: rows });
    } catch (err) {
      console.error('Error fetching vehicles:', err);
      res.status(500).json({ errors: [{ msg: 'Server error fetching vehicles' }] });
    }
};

// Fetch vehicle data for a specific vehcile
exports.getvehcileData = async (req, res) => {
  
  const { userId, vehicleId } = req.query; // Get user ID and vehicle ID from request parameters

  try {
      // Fetch the specific vehicle for the given user ID and vehicle ID
      const [rows] = await connectToMySQL.query(
          `SELECT * FROM Vehicle WHERE user_id = ? AND vehicle_id = ?`, 
          [userId, vehicleId]
      );

      if (!rows.length) {
          return res.status(404).json({ msg: 'No vehicle found for this user with the given ID.' });
      }
      return res.status(200).json({ vehicle: rows[0] });
  } catch (err) {
      console.error('Error fetching vehicle:', err);
      res.status(500).json({ errors: [{ msg: 'Server error fetching vehicle' }] });
  }
};

// Fetch all performance metrics for a specific vehicle of a user
exports.getVehiclePerformanceMetrics = async (req, res) => {
  
  const { userId, vehicleId } = req.query; // Get user ID and vehicle ID from request parameters
  try {
    // Fetch the performance metrics for the given user ID and vehicle ID
    const [rows] = await connectToMySQL.query(
      `SELECT * 
       FROM VehiclePerformanceMetrics 
       WHERE user_id = ? AND vehicle_id = ? 
       ORDER BY lastUpdated DESC
       LIMIT 2`,
      [userId, vehicleId]
    );

    if (!rows.length) {
      return res.status(404).json({ msg: 'No performance metrics found for this vehicle of the user.' });
    }
    return res.status(200).json({ metrics: rows[0]}); // Return all rows as objects
  } catch (err) {
    console.error('Error fetching vehicle performance metrics:', err);
    res.status(500).json({ errors: [{ msg: 'Server error fetching vehicle performance metrics' }] });
  }
};
