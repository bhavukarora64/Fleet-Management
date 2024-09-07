const mongoose = require('mongoose');

const uri = process.env.DATABASE_CONNECTION_STRING
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const vehicleSchema = new mongoose.Schema({
    vehicle_id: { type: String, unique: true },
    license_plate: { type: String, required: true },
    status: { type: String, required: true },
    purchase_date: { type: String, required: true },
    insurance_expiry: { type: String, required: true },
    registration_expiry: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    color: String,
    mileage: Number,
    registration_number: { type: String, unique: true }
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
