// /helperScript/directoryWatcher.js
const chokidar = require('chokidar');
const convertToCsv = require('./convertToCsv.js');
const connectToMySQL = require('./mysqlDB.js'); // Import MySQL connector

async function watchDirectory(directoryToWatch) {
    try {
         // Establish MySQL connection once

        const watcher = chokidar.watch(directoryToWatch, {
            persistent: true,
            ignoreInitial: true,
            depth: 2
        });

        watcher.on('add', (filePath) => {
            if (filePath.endsWith('.csv')) {
                console.log(`New CSV file detected: ${filePath}`);
                convertToCsv(filePath, connectToMySQL); // Pass the initialized MySQL client
            }
        });

        watcher.on('error', (error) => {
            console.error('Error watching directory:', error);
        });
    } catch (error) {
        console.error('Error setting up directory watcher:', error);
    }
}

module.exports = watchDirectory;
