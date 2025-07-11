import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user has a valid session on app load
    const checkLoggedIn = async () => {
      try {
        const { data } = await api.get('/auth/status');
        if (data.loggedIn) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Auth status check failed", error);
      } finally {
        setLoading(false);
      }
    };
    checkLoggedIn();
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    const statusResponse = await api.get('/auth/status');
    if (statusResponse.data.loggedIn) {
      setUser(statusResponse.data.user);
    }
    return data;
  };

  const logout = async () => {
    await api.post('/auth/logout');
    setUser(null);
  };

  const value = { user, login, logout, loading, isLoggedIn: !!user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};