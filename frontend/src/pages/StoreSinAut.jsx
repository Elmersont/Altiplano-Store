import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarAltiplano from '../components/Navbar';
import FooterAltiplano from '../components/Footer';
import '../styles/Store.css';

const NoLogin = () => {
  const navigate = useNavigate(); 
  const handleLogin = () => {
    navigate('/login'); 
  };

  return (
    <>

    <div className="store-container2">    
      <NavbarAltiplano />
      <h1>Nos inspira Chile y sus raíces...</h1>
      <hr />
      <button className="login-button" onClick={handleLogin}>
        👤 Iniciar sesión
      </button>
      <hr />
      <p>*Debes iniciar sesión para ver precios y agregar al carrito</p>
    </div>
    <FooterAltiplano />  
  </>  
  );
};

export default NoLogin;