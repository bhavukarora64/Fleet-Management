// components/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  const checkAuthentication = async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      try {
        const response = await axios.get('http://localhost:3001/api/user', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserId(response.data.userId); // Assuming the API returns userId
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  };

  const login = async (token) => {
    localStorage.setItem('authToken', token);
    await checkAuthentication();
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setUserId(null);
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, checkAuthentication, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
