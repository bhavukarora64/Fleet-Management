// helperScript/schemaCreation.js
const { MongoClient } = require('mongodb');
const Driver = require('../models/driver.js');

async function schemaCreation(client) {
    try {


        const newDriver = new Driver({
            driver_id: "10010",
            name: "John Doe",
            license_number: "ABC123",
            contact_info: {
                phone: "12312312",
                email: "123123  @example.com",
                address: "123 Main St"
            },
            other_details: { 

            }
        });

        await newDriver.save();
        // const result = await collection.insertOne(newDriver);

    } catch (e) {
        console.error("Error connecting to MongoDB:", e);
    }
}

module.exports = schemaCreation;
