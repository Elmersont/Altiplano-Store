import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Nuevo estado de carga

  useEffect(() => {
    const isDevMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    console.log('Modo Desarrollo:', isDevMode);
  
    const token = localStorage.getItem('token');
    console.log('Token almacenado:', token);
  
    const validateToken = async (token) => {
      try {
        const response = await fetch('http://localhost:3001/validate-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });
  
        if (response.ok) {
          const data = await response.json();
          setUser({ email: data.email, ...data.user });
        } else {
          logout();
        }
      } catch (error) {
        console.error('Error validando el token:', error);
        logout();
      } finally {
        setLoading(false); // La validación ha terminado
      }
    };
  
    if (isDevMode) {
      setUser({ email: 'dev@example.com' });
      setLoading(false); // En modo desarrollo, el estado de carga termina inmediatamente
    } else {
      if (token) {
        validateToken(token);
      } else {
        setLoading(false); // No hay token, el estado de carga también termina
      }
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    setUser(userData);
    setLoading(false); // Iniciar sesión finaliza la carga
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setLoading(false); // Cerrar sesión finaliza la carga
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);