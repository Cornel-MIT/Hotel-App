import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';

const PrivateRoute = ({ children }) => {
   const { user } = useAuth();
  if (!user) {
    return <Navigate to="/authform" replace />;
   }

   return children;
};

export default PrivateRoute;