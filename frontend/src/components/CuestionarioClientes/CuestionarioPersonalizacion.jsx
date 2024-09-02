import React, { useState } from 'react';
import styles from '../../styles/Cuestionario.module.css';

const CuestionarioPersonalizacion = () => {
  const [answers, setAnswers] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [width, setWidth] = useState(45);
  const [height, setHeight] = useState(200);

  const handleOptionSelect = (question, answer) => {
    setAnswers(prev => ({ ...prev, [question]: answer }));
  };

  const isStepComplete = () => {
    if (currentStep === 1) {
      return answers['Hojas del lienzo'] && answers['Orientación de la manilla'];
    } else if (currentStep === 2) {
      return answers['Tu Puerta estará en'];
    } else if (currentStep === 3) {
      return answers['Estilo de cierre de tu puerta será'];
    }
    return false;
  };

  const handleNextStep = () => {
    if (isStepComplete()) {
      setCurrentStep(prev => prev + 1);
    } else {
      alert("Por favor selecciona todas las opciones antes de continuar.");
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleIncompleteForm = () => {
    alert("Por favor completa todas las opciones antes de continuar.");
  };

  const handleAddToCart = () => {
    if (isFormComplete()) {
      console.log('Producto agregado al carrito con las siguientes configuraciones:');
      console.log(`Width: ${width}, Height: ${height}`);
      window.location.href = '/carrito';
    } else {
      handleIncompleteForm();
    }
  };

  const handleSaveLienzo = () => {
    if (isFormComplete()) {
      console.log('Lienzo guardado en favoritos');
      alert('Tu lienzo ha sido guardado en tus favoritos.');
    } else {
      handleIncompleteForm();
    }
  };

  const isSelected = (question, option) => answers[question] === option;

  const isFormComplete = () => {
    return (
      answers['Hojas del lienzo'] &&
      answers['Orientación de la manilla'] &&
      answers['Tu Puerta estará en'] &&
      answers['Estilo de cierre de tu puerta será']
    );
  };

  return (
    <div className={styles.cuestionarioContainer}>
      {currentStep === 1 && (
        <>
          <h3>Configura tu puerta</h3>
          <div>
            <label>Hojas del lienzo:</label>
            <button 
              className={isSelected('Hojas del lienzo', 'single') ? `${styles.cuestionarioButton} ${styles.selected}` : styles.cuestionarioButton}
              onClick={() => handleOptionSelect('Hojas del lienzo', 'single')}
            >
              Single
            </button>
            <button 
              className={isSelected('Hojas del lienzo', 'double') ? `${styles.cuestionarioButton} ${styles.selected}` : styles.cuestionarioButton}
              onClick={() => handleOptionSelect('Hojas del lienzo', 'double')}
            >
              Double
            </button>
          </div>
          <div>
            <label>Ancho de cada hoja: {width} cm</label>
            <input
              type="range"
              min="45"
              max="130"
              value={width}
              className={styles.slider}
              onChange={e => setWidth(e.target.value)}
            />
          </div>
          <div>
            <label>Altura de cada hoja: {height} cm</label>
            <input
              type="range"
              min="200"
              max="240"
              value={height}
              className={styles.slider}
              onChange={e => setHeight(e.target.value)}
            />
          </div>
          <div>
            <label>Orientación de la manilla:</label>
            <button 
              className={isSelected('Orientación de la manilla', 'derecha') ? `${styles.cuestionarioButton} ${styles.selected}` : styles.cuestionarioButton}
              onClick={() => handleOptionSelect('Orientación de la manilla', 'derecha')}
            >
              Derecha
            </button>
            <button 
              className={isSelected('Orientación de la manilla', 'izquierda') ? `${styles.cuestionarioButton} ${styles.selected}` : styles.cuestionarioButton}
              onClick={() => handleOptionSelect('Orientación de la manilla', 'izquierda')}
            >
              Izquierda
            </button>
            <button 
              className={isSelected('Orientación de la manilla', 'n/a') ? `${styles.cuestionarioButton} ${styles.selected}` : styles.cuestionarioButton}
              onClick={() => handleOptionSelect('Orientación de la manilla', 'n/a')}
            >
              N/A
            </button>
          </div>
          <div className={styles.navigationButtons}>
            <button onClick={handleNextStep} className={styles.navButton}>Siguiente</button>
          </div>
        </>
      )}

      {currentStep === 2 && (
        <>
          <h3>Tu Puerta estará en:</h3>
          <button 
            className={isSelected('Tu Puerta estará en', 'interior') ? `${styles.cuestionarioButton} ${styles.selected}` : styles.cuestionarioButton}
            onClick={() => handleOptionSelect('Tu Puerta estará en', 'interior')}
          >
            Interior
          </button>
          <button 
            className={isSelected('Tu Puerta estará en', 'exterior') ? `${styles.cuestionarioButton} ${styles.selected}` : styles.cuestionarioButton}
            onClick={() => handleOptionSelect('Tu Puerta estará en', 'exterior')}
          >
            Exterior
          </button>
          <div className={styles.navigationButtons}>
            <button onClick={handlePreviousStep} className={styles.navButton}>Anterior</button>
            <button onClick={handleNextStep} className={styles.navButton}>Siguiente</button>
          </div>
        </>
      )}

      {currentStep === 3 && (
        <>
          <h3>El estilo de cierre de tu puerta será:</h3>
          <button 
            className={isSelected('Estilo de cierre de tu puerta será', 'Clásica') ? `${styles.cuestionarioButton} ${styles.selected}` : styles.cuestionarioButton}
            onClick={() => handleOptionSelect('Estilo de cierre de tu puerta será', 'Clásica')}
          >
            Clásica
          </button>
          <button 
            className={isSelected('Estilo de cierre de tu puerta será', 'Granero') ? `${styles.cuestionarioButton} ${styles.selected}` : styles.cuestionarioButton}
            onClick={() => handleOptionSelect('Estilo de cierre de tu puerta será', 'Granero')}
          >
            Granero
          </button>
          <button 
            className={isSelected('Estilo de cierre de tu puerta será', 'Pivotante') ? `${styles.cuestionarioButton} ${styles.selected}` : styles.cuestionarioButton}
            onClick={() => handleOptionSelect('Estilo de cierre de tu puerta será', 'Pivotante')}
          >
            Pivotante
          </button>
          <button 
            className={isSelected('Estilo de cierre de tu puerta será', 'Bolsillo') ? `${styles.cuestionarioButton} ${styles.selected}` : styles.cuestionarioButton}
            onClick={() => handleOptionSelect('Estilo de cierre de tu puerta será', 'Bolsillo')}
          >
            Bolsillo
          </button>

          <div className={styles.navigationButtons}>
            <button onClick={handlePreviousStep} className={styles.navButton}>Anterior</button>
          </div>

          <div className={styles.actionButtons}>
            <button 
              onClick={() => {
                if (answers['Estilo de cierre de tu puerta será']) {
                  handleAddToCart();
                } else {
                  handleIncompleteForm();
                }
              }} 
              className={styles.actionButton}
            >
              Ir al carrito de compras
            </button>
            <button 
              onClick={() => {
                if (answers['Estilo de cierre de tu puerta será']) {
                  window.location.href = `/accesorios/${answers['Estilo de cierre de tu puerta será'].toLowerCase()}`;
                } else {
                  handleIncompleteForm();
                }
              }} 
              className={styles.actionButton}
            >
              Ver accesorios
            </button>
            <button 
              onClick={() => {
                if (answers['Estilo de cierre de tu puerta será']) {
                  handleSaveLienzo();
                } else {
                  handleIncompleteForm();
                }
              }} 
              className={styles.actionButton}
            >
              Guardar tu lienzo
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CuestionarioPersonalizacion;
