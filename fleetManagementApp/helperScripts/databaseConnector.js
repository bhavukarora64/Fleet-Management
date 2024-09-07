// helperScript/DatabaseConnector.js
const { MongoClient } = require('mongodb');

async function databaseConnector() 
{
    const uri = "mongodb+srv://root:root@fleetmanagement.b8xiwaa.mongodb.net/";
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log("Connected to MongoDB successfully!");
        return client;
    } catch (e) {
        console.error("Error connecting to MongoDB:", e);
    }
}

module.exports = databaseConnector;