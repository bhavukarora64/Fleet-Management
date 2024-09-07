const mongoose = require('mongoose');

const uri = process.env.DATABASE_CONNECTION_STRING
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    user_Id: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    date_Of_Birth: { type: String, required: true },
    contact_Info: {
        phone: String,
        email: String,
        address: String
    },
    other_details: { type: mongoose.Schema.Types.Mixed } 
});

const User = mongoose.model('User', userSchema);

module.exports = User;
