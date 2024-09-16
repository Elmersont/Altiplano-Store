import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Detecta automáticamente si estamos en modo desarrollo
    const isDevMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

    console.log('Modo Desarrollo:', isDevMode);

    // Modo desarrollo: simulamos autenticación automática
    if (isDevMode) {
      setUser({ email: 'dev@example.com' });
    } else {
      const token = localStorage.getItem('token');
      if (token) {
        setUser({ token });
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setUser({ token });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
