// src/pages/Home.jsx
import React from 'react';
import FooterAltiplano from '../components/Footer.jsx'; // Importa el componente del footer

function Home() {
  return (
    <>
      {/* Contenido principal de la página */}
      <div className="main-content">
        <h1>Bienvenido a Altiplano Store</h1>
        <p>Explora nuestra tienda y descubre productos únicos para tu estilo de vida.</p>
        {/* Añade aquí más contenido como secciones, banners, etc. */}
      </div>

      <FooterAltiplano />
    </>
  );
}

export default Home;