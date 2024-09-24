const WebSocket = require('ws');

let wss; // WebSocket Server instance
const clients = new Map(); // Store client connections with user context

function initializeWebSocket(server) {
  wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('New WebSocket connection established');

    // Send a welcome message as JSON
    ws.send(JSON.stringify({ type: 'welcome', message: 'Welcome to WebSocket server!' }));

    ws.on('message', (message) => {
      try {
        const parsedMessage = JSON.parse(message);

        if (parsedMessage.type === 'init') {
          const { userId } = parsedMessage.data;
          if (userId) {
            clients.set(ws, { userId });
            console.log(`WebSocket client registered with userId: ${userId}`);
          }
        } else if (parsedMessage.type === 'requestMetrics') {
          const { vehicleId } = parsedMessage.data;
          if (vehicleId) {
            // Request vehicle metrics from the server
            fetchVehicleMetrics(vehicleId); // Ensure this function exists and performs the request
          }
        } else {
          console.log('Received message from client:', parsedMessage);
        }
      } catch (err) {
        console.error('Error processing message:', err);
      }
    });

    ws.on('close', () => {
      clients.delete(ws);
      console.log('Client disconnected');
    });
  });
}

function broadcast(data) {
  if (wss) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }
}

module.exports = { initializeWebSocket, broadcast };

// Example function to fetch vehicle metrics (for demonstration purposes)
async function fetchVehicleMetrics(vehicleId) {
  // Implement the logic to fetch vehicle metrics from your database or API
  // Once metrics are fetched, broadcast the data to WebSocket clients
}
