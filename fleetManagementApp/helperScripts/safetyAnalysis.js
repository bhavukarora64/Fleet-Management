// helperScript/safetyAnalysis.js
function analyzeSafety(dataset, prevAltitude) {
    const dataArray = [dataset];

    const altitudes = dataArray.map(entry => parseFloat(entry.Altitude));

    var altitudeChanges = null;

    const altitudeChange = Math.abs(altitudes - prevAltitude);
    if (altitudeChange > 10) 
        {
            altitudeChanges =  {
                altitudeChanges: altitudeChange,
                previousAltitude: prevAltitude,
                currentAltitude: altitudes,
                isAltitudeFine: "False"
            };
        }
    else
        {
            altitudeChanges =  {
                altitudeChanges: altitudeChange,
                previousAltitude: prevAltitude,
                currentAltitude: altitudes,
                isAltitudeFine: "True"
            };
        }

    const fenceData = {
        fenceValid: dataset.FenceValid,
        fenceCombined: dataset.FenceCombined,
        fences: [dataset.Fence1, dataset.Fence2, dataset.Fence3, dataset.Fence4]
    };

    return {
        altitudeChanges,
        fenceData
    };
}


module.exports = analyzeSafety;