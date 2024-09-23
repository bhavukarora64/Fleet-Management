const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Ensure path is required
const http = require('http'); // Import http module
const WebSocket = require('ws'); // Import WebSocket library

dotenv.config();

const app = express();
// const server = http.createServer(app); // Create an HTTP server from the Express app
// const wss = new WebSocket.Server({ server }); // Create a WebSocket server on top of the HTTP server

const dbConnector = require('./helperScripts/databaseConnector.js');
const watchDirectory = require('./helperScripts/directoryWatcher.js');

// Import routes
const vehicle = require('./routes/vehicle.js');
const driver = require('./routes/driver.js');
const statistics = require('./routes/statistics.js');
const analyticsalerts = require('./routes/analyticsalerts.js');
const dashboard = require('./routes/dashboard.js');
const users = require('./routes/users.js');
const register = require('./routes/register.js');
const login = require('./routes/login.js');
const logout = require('./routes/logout.js');

// Middleware setup
app.use(cors({ origin: ['http://localhost:3000', 'https://fleet-management-eta.vercel.app/'], credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(flash());

// Session setup (before passport initialization)
app.use(
  session({
    name: 'connect.sid',
    secret: process.env.SESSION_SECRET || 'your-secret-key', // Provide default secret for local development
    resave: false,
    saveUninitialized: false,
  })
);

// Passport setup
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Database connection and directory watcher setup
const directoryToWatch = path.resolve('C:/Users/BhavukArora/Documents/Azure Repo/5g-masterarbeit/fleetManagementApp/listedCars');
dbConnector()
  .then(() => {
    watchDirectory(directoryToWatch);
  })
  .catch(error => {
    console.error("Error connecting to MongoDB:", error);
  });

  app.use((req, res) => {
    console.log(`404 Not Found: ${req.method} ${req.url}`);
    res.status(404).send("Sorry, can't find that!");
  });
  app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
  });
// Route setup
app.get("/", (req, res) => {
  console.log("hello");
  res.send("Hello, World!");
});

app.use("/vehicle", vehicle);
app.use("/dashboard", dashboard);
app.use("/driver", driver);
app.use("/analyticsalerts", analyticsalerts);
app.use("/statistics", statistics);
app.use("/register", register);
app.use("/login", login);
app.use("/logout", logout);
app.use('/user', users);


// // Broadcast data to all WebSocket clients
// function broadcastToClients(data) {
//   wss.clients.forEach(client => {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(JSON.stringify(data));
//     }
//   });
// }

// // Handle WebSocket connections
// wss.on('connection', (ws) => {
//   console.log('New WebSocket connection');

//   ws.on('message', async (message) => {
//     const { userId, vehicleId } = JSON.parse(message);

//     try {
//       // Fetch the latest vehicle performance metrics
//       const metrics = await getVehiclePerformanceMetrics(userId, vehicleId);

//       // Broadcast the fetched metrics to all connected clients
//       broadcastToClients({ type: 'performanceMetrics', data: metrics });
//     } catch (error) {
//       console.error('Error fetching vehicle performance metrics:', error);
//       ws.send(JSON.stringify({ type: 'error', message: 'Error fetching metrics' }));
//     }
//   });

//   ws.on('close', () => {
//     console.log('WebSocket connection closed');
//   });
// });

// Start server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
