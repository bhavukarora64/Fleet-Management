const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const http = require('http');
const WebSocket = require('ws');

dotenv.config();

const app = express();
const server = http.createServer(app);

// Import WebSocket setup
const { initializeWebSocket } = require('./helperScripts/WebSocket');

// Import routes
const vehicle = require('./routes/vehicle.js');
const driver = require('./routes/driver.js');
const statistics = require('./routes/statistics.js');
const analyticsalerts = require('./routes/analyticsalerts.js');
const dashboard = require('./routes/dashboard.js');
const users = require('./routes/users.js');
const register = require('./routes/register.js');
const login = require('./routes/login.js');
const sessionRoute = require('./routes/session.js');
const logout = require('./routes/logout.js');

// Middleware setup
app.use(cors({ origin: 'fleet-management-5eyg.vercel.app', credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(flash());

// Session setup
app.use(
  session({
    name: 'connect.sid',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //   secure: false, // Set to true in production with HTTPS
    //   httpOnly: true,
    //   sameSite: 'None'
    // }
  })
);

// Passport setup
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Database connection and directory watcher setup
const dbConnector = require('./helperScripts/databaseConnector.js');
const watchDirectory = require('./helperScripts/directoryWatcher.js');
const directoryToWatch = path.resolve('C:/Users/BhavukArora/Documents/Azure Repo/5g-masterarbeit/fleetManagementApp/listedCars');
dbConnector()
  .then(() => {
    watchDirectory(directoryToWatch);
  })
  .catch(error => {
    console.error("Error connecting to MongoDB:", error);
  });

// Route setup
app.use("/vehicle", vehicle);
app.use("/dashboard", dashboard);
app.use("/driver", driver);
app.use("/analyticsalerts", analyticsalerts);
app.use("/statistics", statistics);
app.use("/register", register);
app.use("/login", login);
app.use("/logout", logout);
app.use('/user', users);
app.use('/session', sessionRoute);


// Initialize WebSocket server
initializeWebSocket(server);

// Start server
const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
