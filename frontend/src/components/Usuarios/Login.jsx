import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import styles from '../../styles/Usuarios.module.css';
import { useAuth } from '../../context/AutentificacionContext'; 

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' }); // 'password' en lugar de 'contrasena'
  const [mensaje, setMensaje] = useState('');
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Hacemos la solicitud de inicio de sesión al backend
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email, password: formData.password }), // Asegúrate de que sea 'password'
      });

      // Verificar si la respuesta es JSON
      const contentType = response.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json(); // Si la respuesta es JSON
      } else {
        data = await response.text(); // Si la respuesta no es JSON
      }

      // Verificar si la autenticación fue exitosa
      if (response.ok && data.token) {
        login(data.token); // Guardamos el token en el contexto de autenticación
        navigate('/perfil'); // Redirigimos a la página de perfil
      } else {
        setMensaje(data || 'Error en la autenticación');
      }
    } catch (error) {
      console.error('Error en la autenticación:', error);
      setMensaje('Error en la solicitud');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.usuariosContainer}>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password" // Este campo es 'password'
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Iniciar Sesión</button>
        </form>
        {mensaje && <p>{mensaje}</p>}
        
        <div className={styles.passwordForgotten}>
          <Link to="/recuperar-contrasena">¿Olvidaste tu contraseña?</Link>
        </div>

        <hr />

        <div>
          <Link to="/registro">
            <button 
              style={{ 
                backgroundColor: '#c6bfab', 
                color: '#FFFFFF', 
                border: 'none', 
                padding: '10px 20px', 
                cursor: 'pointer', 
                borderRadius: '4px' 
              }}>
              Registrarse
            </button> 
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;