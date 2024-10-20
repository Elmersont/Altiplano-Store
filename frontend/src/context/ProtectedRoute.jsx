import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AutentificacionContext'; 
import PropTypes from 'prop-types'; 

const ProtectedRoute = ({ children, redirectTo = '/login' }) => { 
  const { user, loading } = useAuth(); // Añadimos loading del contexto
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Si loading es falso, significa que la autenticación ya se ha verificado
    if (!loading) {
      setIsLoading(false);
    }
  }, [loading]);

  // Muestra el estado de carga mientras el proceso de autenticación está activo
  if (isLoading) {
    return <p>Cargando...</p>;
  }

  // Si el usuario no está autenticado, redirige al login
  if (!user) {
    return <Navigate to="/NoLogin" />;
  }

  // Si el usuario está autenticado, renderiza el contenido protegido
  return children ? children : <Outlet />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
  redirectTo: PropTypes.string,
};

export default ProtectedRoute;