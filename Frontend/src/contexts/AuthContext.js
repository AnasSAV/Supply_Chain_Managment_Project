import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: '',
    profilePic: '',
    role: null,
    branch_id: null,
    id: null,
  });

  const isAuthenticated = () => {
    return user.role !== null;
  };

  const login = (username, profilePic, role, branch_id, id) => {
    setUser({ username, profilePic, role, branch_id, id });
  };

  const logout = () => {
    setUser({
      username: '',
      profilePic: '',
      role: null,
      branch_id: null,
      id: null,
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};






