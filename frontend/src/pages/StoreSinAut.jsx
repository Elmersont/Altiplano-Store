import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Store.css'


  const handleLogin = () => {
    navigate('/login'); 
  };

  return (
    <div className="store-container">
      <h1>Nos inspira Chile y sus raíces...</h1>
      <button className="login-button" onClick={handleLogin}>
                👤 Iniciar sesión
      </button>
      <p>*Debes iniciar sesión para ver precios y agregar al carrito</p>
    </div>
  );

export default Store;
