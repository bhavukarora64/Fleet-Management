const express = require('express');
const app = express();
const dbConnector = require('./helperScripts/databaseConnector.js')
const watchDirectory = require('./helperScripts/directoryWatcher.js');
const listedCars = require('./routes/listedCars.js');
const dashboard = require('./routes/dashboard.js');
const registeredUsers = require('./routes/registeredUsers.js');
const unRegisteredUsers = require('./routes/unRegisteredUsers.js');
const directoryToWatch = "C:/Users/BhavukArora/Documents/Fleet Management/fleetManagementApp/listedCars";


dbConnector()
    .then(client => {
            watchDirectory(directoryToWatch, client); 
    })
    .catch(error => {
        console.error("Error connecting to MongoDB:", error);
    });

    
app.use("/cars", listedCars);
app.use("/dashboard", dashboard);
app.use("/registeredusers", registeredUsers);
app.use("/unregisteredusers", unRegisteredUsers);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});