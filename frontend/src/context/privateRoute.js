import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from './AuthContext';

const PrivateRoute = () => {
  const { isLoggedIn, loading } = useAppContext();

  if (loading) {
    return <div>Cargando...</div>; // o un spinner bonito si prefieres
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
