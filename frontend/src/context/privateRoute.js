import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../context/AuthContext';

const PrivateRoute = () => {
  const { isLoggedIn } = useAppContext();

  // Si no está logueado, redirige al login
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <Outlet />; // Si está logueado, renderiza la ruta protegida
};

export default PrivateRoute;