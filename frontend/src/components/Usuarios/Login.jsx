import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/Usuarios.module.css';
import { useAuth } from '../../context/AutentificacionContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', contrasena: '' });
  const [mensaje, setMensaje] = useState('');
  const { login } = useAuth(); // Asegúrate de importar correctamente login
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email, password: formData.contrasena }),
        credentials: 'include',
      });

      let data;
      try {
        data = await response.json();
      } catch (err) {
        console.error('No se pudo parsear la respuesta JSON:', err);
        setMensaje('Error en la respuesta del servidor.');
        return;
      }

      if (response.ok && data.token) {
        login(data.token, data.user); // Pasa el token y los datos del usuario al iniciar sesión
        navigate('/perfil');
      } else {
        setMensaje(data.message || 'Error en la autenticación');
      }
    } catch (error) {
      console.error('Error en la autenticación:', error);
      setMensaje('Error en la solicitud');
    }
  };

  return (
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
          name="contrasena"
          placeholder="Contraseña"
          value={formData.contrasena}
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
  );
};

export default Login;
