import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ // Store user details
    username: '',
    profilePic: '',
    role: null, // To store the user's role
  });

  const isAuthenticated = () => {
    return user.role !== null; // Return true if user role is set, false otherwise
  };

  const login = (username, profilePic, role) => {
    setUser({ username, profilePic, role });  // Set user details on login
  };

  const logout = () => {
    setUser({ username: '', profilePic: '', role: null }); // Clear user details on logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};






