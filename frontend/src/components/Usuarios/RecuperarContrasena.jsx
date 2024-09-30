import React, { useState } from 'react';
import NavbarAltiplano from '../Navbar';
import styles from '../../styles/Usuarios.module.css';

const RecuperarContrasena = () => {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMensaje('Enviando solicitud de recuperación...');

    // backend 
    setTimeout(() => {
      console.log('Recuperando contraseña para:', email);
      setMensaje('Se ha enviado un correo para recuperar tu contraseña.');
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className={styles.recuperarContainer}>
    <NavbarAltiplano />
    <div className={styles.usuariosContainer}>
      <h2>Recuperar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Correo Electrónico" value={email} onChange={handleChange} required />
        <button type="submit" disabled={isLoading}>{isLoading ? 'Cargando...' : 'Recuperar Contraseña'}</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
    </div>
  );
};

export default RecuperarContrasena;
