const mongoose = require('mongoose');

const uri = process.env.DATABASE_CONNECTION_STRING
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const driverSchema = new mongoose.Schema({
    driver_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    license_number: { type: String, required: true },
    contact_info: {
        phone: String,
        email: String,
        address: String
    },
    other_details: { type: mongoose.Schema.Types.Mixed } 
});

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
