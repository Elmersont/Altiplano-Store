import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/Usuarios.module.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', contrasena: '' });
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // backend
    console.log('Iniciando sesión con:', formData);
    setMensaje('Inicio de sesión exitoso.');
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
    </div>
  );
};

export default Login;
