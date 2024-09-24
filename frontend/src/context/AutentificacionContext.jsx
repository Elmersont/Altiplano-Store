import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const isDevMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    console.log('Modo Desarrollo:', isDevMode);

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
          setUser({ email: data.email, ...data.user }); // Actualiza setUser para incluir todos los datos de usuario
        } else {
          logout();
        }
      } catch (error) {
        console.error('Error validando el token:', error);
        logout();
      }
    };

    if (isDevMode) {
      setUser({ email: 'dev@example.com' });
    } else {
      const token = localStorage.getItem('token');
      if (token) {
        validateToken(token);
      }
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    setUser(userData); 
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
