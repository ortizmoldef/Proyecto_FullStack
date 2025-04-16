import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AuthContext';

const RequireAuth = ({ children }) => {
  const { isLoggedIn } = useAppContext();

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RequireAuth;