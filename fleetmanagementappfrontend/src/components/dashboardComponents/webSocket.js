import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// WebSocket Component
const WebSocketComponent = () => {
  const [socket, setSocket] = useState(null);  // State to hold the WebSocket instance
  const [messages, setMessages] = useState([]); // State to store incoming messages
  const [searchParams] = useSearchParams(); // Hook to read URL parameters
  const vehicleId = searchParams.get('vehicleId'); // Get vehicleId from URL
  const userId = searchParams.get('userId'); // Get userId from URL

  useEffect(() => {
    // Create WebSocket connection when the component mounts
    const ws = new WebSocket('ws://localhost:3001');
    setSocket(ws); // Save the WebSocket instance in the state

    // Connection opened
    ws.addEventListener('open', (event) => {
     ws.send(vehicleId);
    });

    // Listen for messages from the server
    ws.addEventListener('message', (event) => {
      console.log('Message from server', event.data);
      setMessages((prevMessages) => [...prevMessages, event.data]); // Update messages
    });

    // Cleanup when the component unmounts
    return () => {
      ws.close(); // Close WebSocket connection
    };
  }, []); // Empty dependency array to run only once

  // Function to send a message to the server
  const sendMessage = () => {
    if (socket) {
      socket.send('Hello from React Client!'); // Send message via WebSocket
    }
  };

  return (
    <div>
      <h1>Client</h1>
      <button onClick={sendMessage}>Send Msg</button>
      <div>
        <h2>Messages:</h2>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p> // Display received messages
        ))}
      </div>
    </div>
  );
};

export default WebSocketComponent;
