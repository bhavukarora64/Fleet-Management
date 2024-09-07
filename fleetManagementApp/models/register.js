const mongoose = require('mongoose');

const uri = process.env.DATABASE_CONNECTION_STRING
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const registerSchema = new mongoose.Schema({
    user_Id: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    emailID: { type: String, required: true },
    password: { type: String, required: true },
});

const Register = mongoose.model('Register', registerSchema);

module.exports = Register;
