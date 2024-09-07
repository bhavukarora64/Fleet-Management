// helperScript/vehiclePerformance.js
function analyzeVehiclePerformance(data) {
    // Check if any of the required properties are null
    const isDataInvalid = data.AngularRateX == null || data.AngularRateY == null || data.AngularRateZ == null;

    // If data is invalid, set variables to null, else perform calculations
    const unstableMovement = isDataInvalid ? null : (
        Math.abs(parseFloat(data.AngularRateX)) > 0.5 ||
        Math.abs(parseFloat(data.AngularRateY)) > 0.5 ||
        Math.abs(parseFloat(data.AngularRateZ)) > 0.5
    );

    const tripDistance = data.DistanceTrip == null ? null : parseFloat(data.DistanceTrip / 1000);
    const totalDistance = data.DistanceTotal == null ? null : parseFloat(data.DistanceTotal);

    // If data is invalid, set gpsData to null, else extract required properties
    const gpsData = isDataInvalid ? null : {
        fixType: data.FixType,
        satellites: data.Satellites
    };

    return {
        unstableMovement,
        tripDistance,
        totalDistance,
        gpsData
    };
}

module.exports = analyzeVehiclePerformance;
