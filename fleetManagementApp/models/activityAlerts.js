const mongoose = require('mongoose');

const uri = process.env.DATABASE_CONNECTION_STRING
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const alertSchema = new mongoose.Schema({
    alert_id: { type: String, required: true, unique: true },
    vehicle_id: { type: String, required: true },
    driver_id: { type: String, required: true },
    timestamp: { type: Date, required: true },
    type: { type: String, required: true },
    status: { type: String, required: true },
    description: {type: String},
    other_details: { type: mongoose.Schema.Types.Mixed }
});

const Alert = mongoose.model('Alert', alertSchema);

module.exports = Alert;
