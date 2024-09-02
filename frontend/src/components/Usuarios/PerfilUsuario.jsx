import React, { useState } from 'react';
import styles from '../../styles/Usuarios.module.css';
import MisFavoritos from './MisFavoritos'; 

const PerfilUsuario = () => {
  const [currentSection, setCurrentSection] = useState('datosPersonales');
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [userData, setUserData] = useState({
    nombre: 'Juan',
    apellido: 'Perez',
    nombreUsuario: 'Juanca',
    email: 'juan@example.com',
    whatsappCodigo: '+56',
    whatsappNumero: '',
    fotoPerfil: null,
    contrasenaActual: '',
    nuevaContrasena: '',
    confirmarNuevaContrasena: '',
  });

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

  const handlePasswordChange = () => {
    if (userData.nuevaContrasena === userData.confirmarNuevaContrasena) {
      // backend
      alert('Contraseña actualizada con éxito.');
    } else {
      alert('Las contraseñas no coinciden.');
    }
  };

  const toggleShowPasswordFields = () => {
    setShowPasswordFields(!showPasswordFields);
  };

  const checkPasswordStrength = () => {
    const checks = {
      length: userData.nuevaContrasena.length >= 6,
      number: /[0-9]/.test(userData.nuevaContrasena),
      uppercase: /[A-Z]/.test(userData.nuevaContrasena),
      lowercase: /[a-z]/.test(userData.nuevaContrasena)
    };
    return checks;
  };

  const passwordChecks = checkPasswordStrength();

  const handleSaveChanges = () => {
    // backend
    alert('Cambios guardados con éxito.');
  };

  return (
    <div className={styles.perfilUsuarioContainer}>
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
        <h3>{userData.nombreUsuario}</h3>
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
              <label>Apellido:</label>
              <input type="text" name="apellido" value={userData.apellido} onChange={handleInputChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Correo Electrónico:</label>
              <input type="email" name="email" value={userData.email} onChange={handleInputChange} />
            </div>
            <div className={styles.formGroup}>
              <label>¿Cómo prefieres que te digan?</label>
              <input type="text" name="nombreUsuario" value={userData.nombreUsuario} onChange={handleInputChange} />
            </div>
            <div className={styles.formGroup}>
              <label>WhatsApp:</label>
              <div className={styles.whatsappContainer}>
                <input 
                  type="text" 
                  name="whatsappCodigo" 
                  value={userData.whatsappCodigo} 
                  onChange={handleInputChange}
                  disabled
                  className={styles.whatsappCodeInput}
                />
                <input 
                  type="text" 
                  name="whatsappNumero" 
                  value={userData.whatsappNumero} 
                  onChange={handleInputChange}
                  className={styles.whatsappNumberInput}
                />
              </div>
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
                    value={userData.nuevaContrasena} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Confirmar Nueva Contraseña:</label>
                  <input 
                    type="password" 
                    name="confirmarNuevaContrasena" 
                    value={userData.confirmarNuevaContrasena} 
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
