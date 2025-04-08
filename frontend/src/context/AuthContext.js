// AppContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Restaurar la sesión desde localStorage cuando se recarga la página
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');

    if (token) {
      setIsLoggedIn(true); // El usuario está logueado
      setRole(storedRole || ''); // Establecer el rol si está guardado
    }
  }, []);

  const login = (newToken, newRole) => {
    setIsLoggedIn(true);
    setRole(newRole);
    localStorage.setItem('token', newToken);
    localStorage.setItem('role', newRole);
  };

  const logout = () => {
    // Eliminar elementos de localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    
    // Limpiar el estado de autenticación
    setIsLoggedIn(false);
    setRole('');
    setMessage('Has cerrado sesión correctamente');
    setError(null); // Limpiar posibles errores
  };

  return (
    <AppContext.Provider value={{ isLoggedIn, role, message, error, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
