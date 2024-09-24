import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true); // To track loading state

  // Function to fetch session details
  const fetchSession = async () => {
    try {
      const response = await axios.get('https://fleet-management-eta.vercel.app/session', { withCredentials: true });
      if (response.data.user) {
        console.log('userData',response.data.user )
        setIsAuthenticated(true);
        setUserId(response.data.user.user_id);
      } else {
        setIsAuthenticated(false);
        setUserId(null);
      }
    } catch (error) {
      console.error('Error fetching session:', error);
      setIsAuthenticated(false);
      setUserId(null);
    } finally {
      setLoading(false);
    }
  };

  // Check authentication status when the component mounts
  useEffect(() => {
    fetchSession();
  }, []);

  const login = async (resUserId) => {
    setIsAuthenticated(true);
    setUserId(resUserId);
  };

  const logout = async () => {
    try {
      await axios.post('https://fleet-management-eta.vercel.app/logout', {}, { withCredentials: true });
      setIsAuthenticated(false);
      setUserId(null);
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
