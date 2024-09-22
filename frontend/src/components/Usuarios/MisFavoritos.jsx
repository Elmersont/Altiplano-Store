import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from '../../styles/Usuarios.module.css';

const MisFavoritos = () => {
  const [favoritos, setFavoritos] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    //  API para obtener los lienzos favoritos del usuario
    const lienzosGuardados = [
      { id: 1, nombre: 'Lienzo Clásico', categoria: 'Clásica' },
      { id: 2, nombre: 'Lienzo Moderno', categoria: 'Rupturista' },
    ];
    setFavoritos(lienzosGuardados);
  }, []);

  const eliminarFavorito = (id) => {
    setFavoritos(favoritos.filter(favorito => favorito.id !== id));
  };

  const agregarNuevoLienzo = () => {
    navigate('/cuestionario'); 
  };

  return (
    <div className={styles.favoritoSection}>
    <div className={styles.section}>
      <h2>Mis Lienzos Favoritos</h2>
      {favoritos.length > 0 ? (
        <ul className={styles.favoritosList}>
          {favoritos.map(favorito => (
            <li key={favorito.id} className={styles.favoritoItem}>
              <span>{favorito.nombre} - {favorito.categoria}</span>
              <button 
                onClick={() => eliminarFavorito(favorito.id)} 
                className={styles.deleteButton}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes lienzos guardados en favoritos.</p>
      )}
      <button onClick={agregarNuevoLienzo} className={styles.addLienzoButton}>
        Agregar Nuevo Lienzo
      </button>
    </div>
    </div>
  );
};

export default MisFavoritos;
