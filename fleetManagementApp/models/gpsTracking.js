const mongoose = require('mongoose');

const uri = process.env.DATABASE_CONNECTION_STRING
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const gpsTrackingSchema = new mongoose.Schema({
    vehicle_id: { type: String, required: true },
    timestamp: { type: Date, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    other_details: { type: mongoose.Schema.Types.Mixed }
});

const GPSTracking = mongoose.model('GPSTracking', gpsTrackingSchema);

module.exports = GPSTracking;
