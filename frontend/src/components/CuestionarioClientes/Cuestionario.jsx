import React, { useState } from 'react';
import styles from '../../styles/Cuestionario.module.css';

const Cuestionario = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setSelectedSubCategory('');
  };

  const handleSelectSubCategory = (subcategory) => {
    setSelectedSubCategory(subcategory);
  };

  return (
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

      {selectedSubCategory && (
        <button className={styles.navButton}>Ir a ver lienzos</button>
      )}
    </div>
  );
};

export default Cuestionario;
