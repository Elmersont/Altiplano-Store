import React, { createContext, useState, useContext } from 'react';

// Contexto de autenticación
const AutentificacionContext = createContext();

// Hook
export const useAuth = () => useContext(AutentificacionContext);

// Componente proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Función para iniciar sesión
  const login = (name, role) => {
    setUser({ name, role }); 
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null); 
  };

  return (
    <AutentificacionContext.Provider value={{ user, login, logout }}>
      {children}
    </AutentificacionContext.Provider>
  );
};