import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavbarAltiplano from '../components/Navbar';
import FooterAltiplano from '../components/Footer';
import '../styles/Store.css'

const Store = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = [
        { id: 1, name: 'Granjera', imageUrl: 'https://altiplanostore.cl/wp-content/uploads/2021/02/GRANJERA-2-324x324.png', description: ' La línea Granjera son puertas de granero inspiradas en el campesino chileno, esta en particular tiene un diseño de flecha que además de brindar una apariencia rústica da la sensación de movimiento. Esta puerta es el complemento perfecto para espacios con elementos propios distintivos.'},
        { id: 2, name: 'Indómita', imageUrl: '/assets/images/INDOMITA.png', description: 'La línea Indómita, son puertas de granero inspiradas en la flora y fauna de Chile, estas nos cuentan las historia de como cada especie ha luchado por sobrevivir y mantener su libertad en una tierra conquistada y reconquistada. Sus líneas sobrias y colores neutros hacen de este estilo el mejor complemento para espacios modernos.' },
        { id: 3, name: 'Nativa', imageUrl: 'https://altiplanostore.cl/wp-content/uploads/2021/02/NATIVA-1-1-324x324.png', description: 'Línea Nativa, son puertas de granero inspiradas en los pueblos originarios de Chile. Por esto, son fabricadas para ser el centro de atención de cualquier espacio, Kötaish el espíritu Selk’nam es ideal para resaltar en espacios donde un tono plano domina el ambiente.' }
      ];
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <>
    <div className="store-container">
      <NavbarAltiplano />
      <h1>Nos inspira Chile y sus raíces...</h1>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`} className="product-link">
              <img src={product.imageUrl} alt={product.name} className="product-image" />
              <h2>{product.name}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>    
    <FooterAltiplano />    
  </>
  );
};

export default Store;
