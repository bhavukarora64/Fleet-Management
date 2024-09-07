const mysql = require('mysql2/promise'); // Use mysql2 with promise support

// MySQL configuration
const poolConfig = {
            host: 'mysql-ce25c8b-hft-5b3f.j.aivencloud.com',
            port: 10690,
            user: 'avnadmin',
            password: process.env.MYSQL_DATABASE_SECRET, // Replace with your MySQL password
            database: 'FleetManagement', // Replace with your database name
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        };

// Create a MySQL connection pool
const pool = mysql.createPool(poolConfig);

module.exports = pool; // Export the pool to be used in other files

// const mysql = require('mysql2/promise');

// async function connectToMySQL() {
//     try {
//         const connectToMySQL = await mysql.createConnection({
//             host: 'mysql-ce25c8b-hft-5b3f.j.aivencloud.com',
//             port: 10690,
//             user: 'avnadmin',
//             password: process.env.MYSQL_DATABASE_SECRET, // Replace with your MySQL password
//             database: 'FleetManagement', // Replace with your database name
//             waitForConnections: true,
//             connectionLimit: 10,
//             queueLimit: 0
//         });

//         console.log('Connected to MySQL successfully!');
//         return connectToMySQL; // Return the connection with the promise API
//     } catch (error) {
//         console.error('Error connecting to MySQL:', error);
//         throw error;  // Re-throw the error after logging
//     }
// }

// const pool = mysql.createPool(poolConfig);

// module.exports = pool; // Export the pool to be used in other files
