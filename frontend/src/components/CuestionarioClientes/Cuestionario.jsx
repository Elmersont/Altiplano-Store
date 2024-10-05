import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarAltiplano from '../Navbar';
import FooterAltiplano from '../Footer';
import styles from '../../styles/Cuestionario.module.css';

const Cuestionario = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const navigate = useNavigate(); 

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setSelectedSubCategory('');
  };

  const handleSelectSubCategory = (subcategory) => {
    setSelectedSubCategory(subcategory);
  };

  // Función para manejar la redirección según la subcategoría seleccionada
  const handleGoToProduct = () => {
    // Para la opción 'Uno'
    if (selectedOption === 'Uno') {
      if (selectedSubCategory === 'Clase') {
        navigate('/product/1');
      } else if (selectedSubCategory === 'Rupturista') {
        navigate('/product/2');
      } else if (selectedSubCategory === 'Rústica') {
        navigate('/product/3');
      }
    }

    // Para la opción 'Dos'
    if (selectedOption === 'Dos') {
      if (selectedSubCategory === 'Elegante') {
        navigate('/product/1');
      } else if (selectedSubCategory === 'Nativa') {
        navigate('/product/1');
      } else if (selectedSubCategory === 'Rústica') {
        navigate('/product/3');
      }
    }

    // Para la opción 'Tres'
    if (selectedOption === 'Tres' && selectedSubCategory === 'Especiales') {
      navigate('/product/3');
    }
  };

  return (
  <>
  <div className={styles.cuestionario2}>
    <NavbarAltiplano />
    <div className={styles.cuestionarioContainer}>
      <h2>¿Cuántos colores tendrá tu lienzo?</h2>
      <div>
        <button
          className={selectedOption === 'Uno' ? `${styles.cuestionarioButton} ${styles.selected}` : styles.cuestionarioButton}
          onClick={() => handleSelectOption('Uno')}
        >
          Uno, me gustan las cosas simples pero con estilo
        </button>
        <button
          className={selectedOption === 'Dos' ? `${styles.cuestionarioButton} ${styles.selected}` : styles.cuestionarioButton}
          onClick={() => handleSelectOption('Dos')}
        >
          Dos, me gusta darle ese toque extra a la vida
        </button>
        <button
          className={selectedOption === 'Tres' ? `${styles.cuestionarioButton} ${styles.selected}` : styles.cuestionarioButton}
          onClick={() => handleSelectOption('Tres')}
        >
          Tres, la creatividad es lo mío
        </button>
      </div>

      {selectedOption && (
        <div className={styles.subcategorySection}>
          <h3>Selecciona una subcategoría</h3>

          {selectedOption === 'Uno' && (
            <>
              <button
                className={selectedSubCategory === 'Clase' ? `${styles.cuestionarioButton} ${styles.selected}` : styles.cuestionarioButton}
                onClick={() => handleSelectSubCategory('Clase')}
              >
                Clase
              </button>
              <button
                className={selectedSubCategory === 'Rupturista' ? `${styles.cuestionarioButton} ${styles.selected}` : styles.cuestionarioButton}
                onClick={() => handleSelectSubCategory('Rupturista')}
              >
                Rupturista
              </button>
              <button
                className={selectedSubCategory === 'Rústica' ? `${styles.cuestionarioButton} ${styles.selected}` : styles.cuestionarioButton}
                onClick={() => handleSelectSubCategory('Rústica')}
              >
                Rústica
              </button>
            </>
          )}

          {selectedOption === 'Dos' && (
            <>
              <button
                className={selectedSubCategory === 'Elegante' ? `${styles.cuestionarioButton} ${styles.selected}` : styles.cuestionarioButton}
                onClick={() => handleSelectSubCategory('Elegante')}
              >
                Elegante
              </button>
              <button
                className={selectedSubCategory === 'Nativa' ? `${styles.cuestionarioButton} ${styles.selected}` : styles.cuestionarioButton}
                onClick={() => handleSelectSubCategory('Nativa')}
              >
                Nativa
              </button>
              <button
                className={selectedSubCategory === 'Rústica' ? `${styles.cuestionarioButton} ${styles.selected}` : styles.cuestionarioButton}
                onClick={() => handleSelectSubCategory('Rústica')}
              >
                Rústica
              </button>
            </>
          )}

          {selectedOption === 'Tres' && (
            <>
              <button
                className={selectedSubCategory === 'Especiales' ? `${styles.cuestionarioButton} ${styles.selected}` : styles.cuestionarioButton}
                onClick={() => handleSelectSubCategory('Especiales')}
              >
                Especiales
              </button>
            </>
          )}
        </div>
      )}

      {/* Mostrar el botón de redirección cuando hay una subcategoría seleccionada */}
      {selectedSubCategory && (
        <button className={styles.navButton} onClick={handleGoToProduct}>Ir a ver lienzos</button>
      )}
    </div>
   
    </div> <FooterAltiplano />
</>
  );
};

export default Cuestionario;
