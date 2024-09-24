import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/Usuarios.module.css';

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    nombreUsuario: '',
    email: '',
    contrasena: '',
    confirmarContrasena: '',
    // Campos opcionales
    telefono: '',
    region: '',
    ciudad: '',
    direccion: '',
  });
  const [mensaje, setMensaje] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((field) => field.trim() === '')) {
      setMensaje('Todos los campos son obligatorios.');
      return;
    }

    if (formData.contrasena !== formData.confirmarContrasena) {
      setMensaje('Las contraseñas no coinciden.');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(formData.contrasena)) {
      setMensaje('La contraseña no cumple con los requisitos.');
      return;
    }

    setIsLoading(true);
    setMensaje('Registrando usuario...');

    try {
      // Enviar solicitud de registro al backend
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          apellido: formData.apellido,
          nombreUsuario: formData.nombreUsuario,
          email: formData.email,
          password: formData.contrasena,
          telefono: formData.telefono,
          region: formData.region,
          ciudad: formData.ciudad,
          direccion: formData.direccion,
        }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje('Usuario registrado con éxito. Se ha enviado un correo de confirmación.');
        navigate('/login');
      } else {
        setMensaje(data.message || 'Error en el registro.');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      setMensaje('Error en la solicitud.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const checkPasswordStrength = () => {
    const checks = {
      length: formData.contrasena.length >= 6,
      number: /[0-9]/.test(formData.contrasena),
      uppercase: /[A-Z]/.test(formData.contrasena),
      lowercase: /[a-z]/.test(formData.contrasena),
    };
    return checks;
  };

  const passwordChecks = checkPasswordStrength();

  return (
    <div className={styles.usuariosContainer}>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nombreUsuario"
          placeholder="¿Cómo prefieres que te digan?"
          value={formData.nombreUsuario}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <div className={styles.passwordContainer}>
          <input
            type={showPassword ? 'text' : 'password'}
            name="contrasena"
            placeholder="Contraseña"
            value={formData.contrasena}
            onChange={handleChange}
            required
          />
          <input
            type={showPassword ? 'text' : 'password'}
            name="confirmarContrasena"
            placeholder="Confirmar Contraseña"
            value={formData.confirmarContrasena}
            onChange={handleChange}
            required
          />
          <button type="button" className={styles.togglePassword} onClick={toggleShowPassword}>
            Ver Contraseña
          </button>
        </div>
        <div className={styles.passwordRequirements}>
          <p className={passwordChecks.length ? styles.valid : styles.invalid}>
            {passwordChecks.length ? '✔️' : '❌'} Mínimo 6 caracteres
          </p>
          <p className={passwordChecks.number ? styles.valid : styles.invalid}>
            {passwordChecks.number ? '✔️' : '❌'} Contiene número
          </p>
          <p className={passwordChecks.uppercase ? styles.valid : styles.invalid}>
            {passwordChecks.uppercase ? '✔️' : '❌'} Contiene mayúscula
          </p>
          <p className={passwordChecks.lowercase ? styles.valid : styles.invalid}>
            {passwordChecks.lowercase ? '✔️' : '❌'} Contiene minúscula
          </p>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default Registro;
