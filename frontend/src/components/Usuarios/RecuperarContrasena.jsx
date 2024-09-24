import React, { useState } from 'react';
import styles from '../../styles/Usuarios.module.css';

const RecuperarContrasena = () => {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMensaje('Enviando solicitud de recuperación...');

    try {
      // Enviar solicitud al backend para recuperar la contraseña
      const response = await fetch('http://localhost:3001/user/recover-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje('Se ha enviado un correo para recuperar tu contraseña.');
      } else {
        setMensaje(data.message || 'Error al intentar recuperar la contraseña.');
      }
    } catch (error) {
      console.error('Error en la solicitud de recuperación:', error);
      setMensaje('Error en la solicitud. Intenta de nuevo más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.usuariosContainer}>
      <h2>Recuperar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Cargando...' : 'Recuperar Contraseña'}
        </button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default RecuperarContrasena;
