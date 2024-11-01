// File: src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext({});

export const Provider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tempToken, setTempToken] = useState(null);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      tempToken,
      setTempToken,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
