import React, { useState, useEffect } from 'react';
import NavbarAltiplano from '../Navbar';
import { useAuth } from '../../context/AutentificacionContext'; 
import styles from '../../styles/Usuarios.module.css';
import MisFavoritos from './MisFavoritos'; 

const PerfilUsuario = () => {
  const { user } = useAuth(); // Obtenemos el estado de usuario desde el contexto
  const [currentSection, setCurrentSection] = useState('datosPersonales');
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [userData, setUserData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    region: '',
    ciudad: '',
    direccion: '',
    fotoPerfil: null,
    contrasenaActual: '',
    nuevaContrasena: '',
    confirmarNuevaContrasena: '',
  });

  useEffect(() => {
    if (user) {
      setUserData({
        nombre: user.nombre || '',
        email: user.email || '',
        telefono: user.telefono || '',
        region: user.region || '',
        ciudad: user.ciudad || '',
        direccion: user.direccion || '',
        fotoPerfil: user.fotoPerfil || null,
      });
    }
  }, [user]);

  const handleSectionChange = (section) => {
    setCurrentSection(section);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFileChange = (e) => {
    setUserData({ ...userData, fotoPerfil: URL.createObjectURL(e.target.files[0]) });
  };

  const handlePasswordChange = async () => {
    if (userData.nuevaContrasena === userData.confirmarNuevaContrasena) {
      try {
        const response = await fetch('https://altiplano-store-1.onrender.com/user/update-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            currentPassword: userData.contrasenaActual || '',
            newPassword: userData.nuevaContrasena || '',
          }),
        });

        const data = await response.json();

        if (response.ok) {
          alert('Contraseña actualizada con éxito.');
        } else {
          alert(data.message || 'Error al actualizar la contraseña.');
        }
      } catch (error) {
        console.error('Error al actualizar la contraseña:', error);
        alert('Error en la solicitud. Intenta de nuevo más tarde.');
      }
    } else {
      alert('Las contraseñas no coinciden.');
    }
  };

  const toggleShowPasswordFields = () => {
    setShowPasswordFields(!showPasswordFields);
  };

  const checkPasswordStrength = () => {
    const nuevaContrasena = userData.nuevaContrasena || '';
    const checks = {
      length: nuevaContrasena.length >= 6,
      number: /[0-9]/.test(nuevaContrasena),
      uppercase: /[A-Z]/.test(nuevaContrasena),
      lowercase: /[a-z]/.test(nuevaContrasena)
    };
    return checks;
  };

  const passwordChecks = checkPasswordStrength();

  const handleSaveChanges = async () => {
    try {
      const response = await fetch('https://altiplano-store-1.onrender.com/user/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: userData.nombre,
          email: userData.email,
          telefono: userData.telefono,
          region: userData.region,
          ciudad: userData.ciudad,
          direccion: userData.direccion,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Cambios guardados con éxito.');
      } else {
        alert(data.message || 'Error al guardar los cambios.');
      }
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      alert('Error en la solicitud. Intenta de nuevo más tarde.');
    }
  };

  return (
    <div className={styles.perfilUsuarioContainer}>
      <NavbarAltiplano />
      <div className={styles.profileHeader}>
        <label htmlFor="file-upload" className={styles.fotoPerfilLabel}>
          {userData.fotoPerfil ? (
            <img src={userData.fotoPerfil} alt="Foto de Perfil" className={styles.fotoPerfil} />
          ) : (
            <div className={styles.placeholderPerfil}>Foto de Perfil</div>
          )}
        </label>
        <input 
          id="file-upload" 
          type="file" 
          onChange={handleFileChange} 
          className={styles.fileInput} 
          style={{ display: 'none' }} 
        />
        <h3>{userData.nombre}</h3>
      </div>

      <div className={styles.navLateral}>
        <button onClick={() => handleSectionChange('datosPersonales')} className={styles.navButton}>
          Datos Personales
        </button>
        <button onClick={() => handleSectionChange('misFavoritos')} className={styles.navButton}>
          Mis Favoritos
        </button>
      </div>

      <div className={styles.sectionContent}>
        {currentSection === 'datosPersonales' && (
          <div className={styles.section}>
            <h2>Mis Datos</h2>
            <div className={styles.formGroup}>
              <label>Nombre:</label>
              <input type="text" name="nombre" value={userData.nombre} onChange={handleInputChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Correo Electrónico:</label>
              <input type="email" name="email" value={userData.email} onChange={handleInputChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Teléfono:</label>
              <input type="text" name="telefono" value={userData.telefono} onChange={handleInputChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Región:</label>
              <input type="text" name="region" value={userData.region} onChange={handleInputChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Ciudad:</label>
              <input type="text" name="ciudad" value={userData.ciudad} onChange={handleInputChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Dirección:</label>
              <input type="text" name="direccion" value={userData.direccion} onChange={handleInputChange} />
            </div>
            <button onClick={toggleShowPasswordFields} className={styles.navButton}>Cambiar Contraseña</button>
            {showPasswordFields && (
              <>
                <div className={styles.formGroup}>
                  <label>Contraseña Actual:</label>
                  <input 
                    type="password" 
                    name="contrasenaActual" 
                    value={userData.contrasenaActual} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Nueva Contraseña:</label>
                  <input 
                    type="password" 
                    name="nuevaContrasena" 
                    value={userData.nuevaContrasena || ''} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Confirmar Nueva Contraseña:</label>
                  <input 
                    type="password" 
                    name="confirmarNuevaContrasena" 
                    value={userData.confirmarNuevaContrasena || ''} 
                    onChange={handleInputChange} 
                  />
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
                <button onClick={handlePasswordChange} className={styles.navButton}>Actualizar Contraseña</button>
              </>
            )}

            <button onClick={handleSaveChanges} className={styles.navButton}>Guardar Cambios</button>
          </div>
        )}

        {currentSection === 'misFavoritos' && (
          <MisFavoritos />
        )}
      </div>
    </div>
  );
};

export default PerfilUsuario;
