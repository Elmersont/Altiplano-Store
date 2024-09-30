import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavbarAltiplano from '../Navbar';
import styles from '../../styles/Cuestionario.module.css';

const CuestionarioPersonalizacion = () => {
  const { id } = useParams(); 
  const [answers, setAnswers] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [width, setWidth] = useState(45); 
  const [height, setHeight] = useState(200); 
  const navigate = useNavigate(); 

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

  
  const calcularPrecio = () => {
    let precioBase;
    

    switch (id) {
      case '1':
        precioBase = 189990; 
        break;
      case '2':
        precioBase = 279390; 
        break;
      case '3':
        precioBase = 303000; 
        break;
      default:
        precioBase = 189990; 
        break;
    }

    const anchoBase = 45; // cm
    const altoBase = 200; // cm
    const areaBase = anchoBase * altoBase; // Área base (45 cm * 200 cm = 9.000 cm²)
    const areaSeleccionada = width * height; // Área seleccionada (ancho * altura seleccionados)
    const factorTamaño = areaSeleccionada / areaBase; // Factor de ajuste
    return Math.round(precioBase * factorTamaño); // Precio ajustado
  };

  const handleAddToCart = () => {
    if (isFormComplete()) {
      const productoCarrito = {
        id: id, 
        name: `Producto ${id}`,
        width: width,
        height: height,
        price: calcularPrecio(), 
        quantity: 1,
        dimensions: `${width}cm x ${height}cm`
      };
      const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
      const nuevoCarrito = [...carritoActual, productoCarrito];
      localStorage.setItem('carrito', JSON.stringify(nuevoCarrito)); 
      navigate('/carrito'); 
    } else {
      handleIncompleteForm();
    }
  };

  const handleSaveLienzo = () => {
    if (isFormComplete()) {
      const lienzoFavorito = {
        id: id,
        width: width,
        height: height,
      };
      const favoritosActuales = JSON.parse(localStorage.getItem('favoritos')) || [];
      const nuevosFavoritos = [...favoritosActuales, lienzoFavorito];
      localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos)); 
      alert('Tu lienzo ha sido guardado en tus favoritos.');
      navigate('/perfil/favoritos'); 
    } else {
      handleIncompleteForm();
    }
  };

  const isFormComplete = () => {
    return (
      answers['Hojas del lienzo'] &&
      answers['Orientación de la manilla'] &&
      answers['Tu Puerta estará en'] &&
      answers['Estilo de cierre de tu puerta será']
    );
  };

  return (
    <div className={styles.cuestionario}>
    <NavbarAltiplano />
    <div className={styles.cuestionarioContainer}>
 
      <div className={styles.precioActual}>
        <h4>Precio actual: ${calcularPrecio().toLocaleString('es-CL')}</h4>
      </div>

      {/* Mostrar el producto ID en el cuestionario */}
      <h3>Configurando producto ID: {id}</h3>

      {/* Configuración de hojas y manillas */}
      {currentStep === 1 && (
        <>
          <h3>Configura tu puerta</h3>
          <div>
            <label>Hojas del lienzo:</label>
            <button 
              className={answers['Hojas del lienzo'] === 'single' ? `${styles.cuestionarioButton} ${styles.selected}` : styles.cuestionarioButton}
              onClick={() => handleOptionSelect('Hojas del lienzo', 'single')}
            >
              Single
            </button>
            <button 
              className={answers['Hojas del lienzo'] === 'double' ? `${styles.cuestionarioButton} ${styles.selected}` : styles.cuestionarioButton}
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
              className={answers['Orientación de la manilla'] === 'derecha' ? `${styles.cuestionarioButton} ${styles.selected}` : styles.cuestionarioButton}
              onClick={() => handleOptionSelect('Orientación de la manilla', 'derecha')}
            >
              Derecha
            </button>
            <button 
              className={answers['Orientación de la manilla'] === 'izquierda' ? `${styles.cuestionarioButton} ${styles.selected}` : styles.cuestionarioButton}
              onClick={() => handleOptionSelect('Orientación de la manilla', 'izquierda')}
            >
              Izquierda
            </button>
            <button 
              className={answers['Orientación de la manilla'] === 'n/a' ? `${styles.cuestionarioButton} ${styles.selected}` : styles.cuestionarioButton}
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

      {/* Interior o exterior */}
      {currentStep === 2 && (
        <>
          <h3>Tu Puerta estará en:</h3>
          <button 
            className={answers['Tu Puerta estará en'] === 'interior' ? `${styles.cuestionarioButton} ${styles.selected}` : styles.cuestionarioButton}
            onClick={() => handleOptionSelect('Tu Puerta estará en', 'interior')}
          >
            Interior
          </button>
          <button 
            className={answers['Tu Puerta estará en'] === 'exterior' ? `${styles.cuestionarioButton} ${styles.selected}` : styles.cuestionarioButton}
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

      {/* Estilo de cierre */}
      {currentStep === 3 && (
        <>
          <h3>El estilo de cierre de tu puerta será:</h3>
          <button 
            className={answers['Estilo de cierre de tu puerta será'] === 'Clásica' ? `${styles.cuestionarioButton} ${styles.selected}` : styles.cuestionarioButton}
            onClick={() => handleOptionSelect('Estilo de cierre de tu puerta será', 'Clásica')}
          >
            Clásica
          </button>
          <button 
            className={answers['Estilo de cierre de tu puerta será'] === 'Granero' ? `${styles.cuestionarioButton} ${styles.selected}` : styles.cuestionarioButton}
            onClick={() => handleOptionSelect('Estilo de cierre de tu puerta será', 'Granero')}
          >
            Granero
          </button>
          <button 
            className={answers['Estilo de cierre de tu puerta será'] === 'Pivotante' ? `${styles.cuestionarioButton} ${styles.selected}` : styles.cuestionarioButton}
            onClick={() => handleOptionSelect('Estilo de cierre de tu puerta será', 'Pivotante')}
          >
            Pivotante
          </button>
          <button 
            className={answers['Estilo de cierre de tu puerta será'] === 'Bolsillo' ? `${styles.cuestionarioButton} ${styles.selected}` : styles.cuestionarioButton}
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
              Agregar al carrito de compras
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
    </div>
  );
};

export default CuestionarioPersonalizacion;
