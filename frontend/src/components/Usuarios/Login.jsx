import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import styles from '../../styles/Usuarios.module.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', contrasena: '' });
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de autenticación con backend
    console.log('Iniciando sesión con:', formData);

    // Simula un inicio de sesión exitoso
    setMensaje('Inicio de sesión exitoso.');
    navigate('/perfil'); // Redirige a la página de perfil
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
        <button type="submit">Iniciar Sesión</button> {/* Botón para iniciar sesión */}
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