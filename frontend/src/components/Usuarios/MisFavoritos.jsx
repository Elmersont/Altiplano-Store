import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from '../../styles/Usuarios.module.css';

const MisFavoritos = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const obtenerFavoritos = async () => {
      try {
        const response = await fetch('https://altiplano-store-1.onrender.com/favorites', { 
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const data = await response.json();

        if (response.ok) {
          setFavoritos(data.favoritos);
        } else {
          setError(data.message || 'Error al cargar los favoritos.');
        }
      } catch (error) {
        console.error('Error al obtener los favoritos:', error);
        setError('Error al cargar los favoritos.');
      } finally {
        setIsLoading(false);
      }
    };

    obtenerFavoritos();
  }, []);


  const eliminarFavorito = async (id) => {
    try {
      const response = await fetch(`https://altiplano-store-1.onrender.com/favorites/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        setFavoritos(favoritos.filter(favorito => favorito.id !== id));
      } else {
        const data = await response.json();
        setError(data.message || 'Error al eliminar el favorito.');
      }
    } catch (error) {
      console.error('Error al eliminar el favorito:', error);
      setError('Error al eliminar el favorito.');
    }
  };

  const agregarNuevoLienzo = () => {
    navigate('/cuestionario'); 
  };

  return (
    <div className={styles.favoritoSection}>
    <div className={styles.section}>
    <h2>Mis Lienzos Favoritos</h2>
      {isLoading ? (
        <p>Cargando favoritos...</p>
      ) : error ? (
        <p>{error}</p>
      ) : 
      favoritos.length > 0 ? (
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
