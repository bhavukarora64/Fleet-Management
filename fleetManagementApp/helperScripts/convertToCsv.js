const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');
const drivingBehaviour = require('./drivingBehaviour.js');
const vehiclePerformance = require('./vehiclePerformance.js');
const analyzeSafety = require('./safetyAnalysis.js');

// Helper function to check if a value is numeric
function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

async function processCSVFile(filePath, connectToMySQL) {
    try {
        let prevAltitude = null;
        const jsonData = [];

        console.log(`Processing CSV file at path: ${filePath}`);

        // Extract the folder name as vehicle_id and user_id (assuming directory name as user_id)
        const vehicle_id = path.basename(path.dirname(filePath)); // Vehicle ID from parent directory
        const user_id = path.basename(path.dirname(path.dirname(filePath))); // User ID from the parent directory's parent directory

        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (row) => {
                // Check if the latitude and longitude fields are numeric
                if (!isNumeric(row.Latitude) || !isNumeric(row.Longitude)) {
                    console.log(`Skipping row with non-numeric values`);
                    return; // Skip this row
                }

                // Process the valid data rows
                const drivingBehaviourResult = drivingBehaviour(row);
                const vehiclePerformanceResult = vehiclePerformance(row);
                const analyzeSafetyResult = analyzeSafety(row, prevAltitude);
                prevAltitude = row.Altitude;

                row.fleetAnalaysis = {
                    drivingBehaviour: drivingBehaviourResult,
                    vehiclePerformance: vehiclePerformanceResult,
                    SafetyAnalysis: analyzeSafetyResult
                };

                jsonData.push(row);
            })
            .on('end', async () => {
                // Prepare the data to be inserted
                for (const data of jsonData) {
                    const drivingBehaviourResult = data.fleetAnalaysis.drivingBehaviour;
                    const vehiclePerformanceResult = data.fleetAnalaysis.vehiclePerformance;

                    // Extract relevant metrics
                    const isAggressiveAcceleration = drivingBehaviourResult.isAggressiveAcceleration;
                    const isSpeeding = drivingBehaviourResult.isSpeeding;
                    const isSwerving = drivingBehaviourResult.isSwerving;

                    const unstableMovement = vehiclePerformanceResult.unstableMovement;
                    const tripDistance = vehiclePerformanceResult.tripDistance;
                    const totalDistance = vehiclePerformanceResult.totalDistance;

                    const latitude = parseFloat(data.Latitude);  // Convert latitude to a float
                    const longitude = parseFloat(data.Longitude); // Convert longitude to a float
                    const lastUpdated = data.Timestamp || new Date(); // Default to current time if not provided

                    // Insert into MySQL database using user_id
                    await connectToMySQL.execute(
                        `INSERT INTO VehiclePerformanceMetrics (user_id, vehicle_id, isAggressiveAcceleration, isSpeeding, isSwerving, unstableMovement, tripDistance, totalDistance, latitude, longitude, lastUpdated) 
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                        [user_id, vehicle_id, isAggressiveAcceleration, isSpeeding, isSwerving, unstableMovement, tripDistance, totalDistance, latitude, longitude, lastUpdated]
                    );
                }

                console.log(`${jsonData.length} records processed and inserted into MySQL database.`);
            });
    } catch (error) {
        console.error('Error processing CSV file:', error);
    }
}

module.exports = processCSVFile;
