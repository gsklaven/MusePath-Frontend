import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      try {
        console.log('AuthContext login: Starting login', { email });
        
        // Basic authentication - encode credentials
        // Use encodeURIComponent to handle special characters
        const token = btoa(encodeURIComponent(`${email}:${password}`));
        const userData = {
          email,
          token,
          id: Date.now(), // Mock user ID
        };
        
        console.log('AuthContext login: Setting user data', userData);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        console.log('AuthContext login: User state updated, resolving promise');
        resolve(userData);
      } catch (error) {
        console.error('AuthContext login error:', error);
        reject(error);
      }
    });
  };

  const register = (email, password) => {
    return new Promise((resolve, reject) => {
      try {
        console.log('AuthContext register: Starting registration', { email });
        
        // Basic authentication - encode credentials
        // Use encodeURIComponent to handle special characters
        const token = btoa(encodeURIComponent(`${email}:${password}`));
        const userData = {
          email,
          token,
          id: Date.now(), // Mock user ID
          isNewUser: true,
        };
        
        console.log('AuthContext register: Setting user data', userData);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        console.log('AuthContext register: User state updated, resolving promise');
        resolve(userData);
      } catch (error) {
        console.error('AuthContext register error:', error);
        reject(error);
      }
    });
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
