import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { user } = useAuth();

  return user && user.username ? <Element {...rest} /> : <Navigate to="/" replace />;
};

export default PrivateRoute;