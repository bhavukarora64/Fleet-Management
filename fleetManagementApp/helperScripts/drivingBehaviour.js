//helperScript/drivingBehavior.js
const calculateAccelerationMagnitude = require('./accelerationMagnitude.js');

function analyzeDrivingBehavior(data) {
    const accelerationMagnitude = calculateAccelerationMagnitude(data);
    const accelerationThreshold = 5;
    const isAggressiveAcceleration = accelerationMagnitude > accelerationThreshold;


    const speed = parseFloat(data.Speed);
    const speedThreshold = 80;
    const isSpeeding = speed > speedThreshold;

    const roll = parseFloat(data.Roll);
    const pitch = parseFloat(data.Pitch);
    const isSwerving = Math.abs(roll) > 20 || Math.abs(pitch) > 20;

    return {
        isAggressiveAcceleration,
        isSpeeding,
        isSwerving
    };
}

module.exports = analyzeDrivingBehavior;
