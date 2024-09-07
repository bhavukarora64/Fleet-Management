// /helperScript/accelarationMagnitude.js

function calculateAccelerationMagnitude(dataPoint) {
    const accelerationX = parseFloat(dataPoint.AccelerationX || NaN);
    const accelerationY = parseFloat(dataPoint.AccelerationY || NaN);
    const accelerationZ = parseFloat(dataPoint.AccelerationZ || NaN);
    
    if (isNaN(accelerationX) || isNaN(accelerationY) || isNaN(accelerationZ)) {
        return null;
    }
    
    const magnitude = Math.sqrt(accelerationX ** 2 + accelerationY ** 2 + accelerationZ ** 2);
    return magnitude;
}

module.exports = calculateAccelerationMagnitude;
