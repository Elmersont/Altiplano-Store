import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AutentificacionContext'; 
import PropTypes from 'prop-types'; 

const ProtectedRoute = ({ children, redirectTo = '/login' }) => { 
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user !== null) {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
  redirectTo: PropTypes.string,
};

export default ProtectedRoute;
