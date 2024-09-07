// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import UserManagement from './components/UserManagement';
import Vehicles from './components/Vehicles';
import ActivityAlerts from './components/ActivityAlerts';
import Statistics from './components/Statistics';
import Maps from './components/dashboardComponents/Map';
import Navbar from './components/Navbar';

function App() {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/usermanagement" element={<UserManagement />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/activityalerts" element={<ActivityAlerts />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/maps" element={<Maps />} />
        </Routes>
      </Router>
  );
}


export default App;