// routes/register.js
const express = require('express');
const router = express.Router();
const { userRegistration } = require('../controllers/register');

router.post('/', userRegistration);

module.exports = router;
