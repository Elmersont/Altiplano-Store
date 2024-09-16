import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AutentificacionContext'; 

const Store = () => {
  const [products, setProducts] = useState([]);
  const { user } = useAuth(); 

  useEffect(() => {
    const fetchProducts = async () => {
      const data = [
        { id: 1, name: 'Granjera', imageUrl: 'https://altiplanostore.cl/wp-content/uploads/2021/02/GRANJERA-2-324x324.png', description: 'La línea Granjera son puertas de granero inspiradas en el campesino chileno.' },
        { id: 2, name: 'Indómita', imageUrl: 'https://altiplanostore.cl/wp-content/uploads/2021/02/INDOMITA-1-324x324.png', description: 'La línea Indómita son puertas de granero inspiradas en la flora y fauna de Chile.' },
        { id: 3, name: 'Nativa', imageUrl: 'https://altiplanostore.cl/wp-content/uploads/2021/02/NATIVA-1-1-324x324.png', description: 'Línea Nativa, son puertas de granero inspiradas en los pueblos originarios de Chile.' }
      ];
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="store-container">
      <h1>Nos inspira Chile y sus raíces...</h1>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`}>
              <img src={product.imageUrl} alt={product.name} className="product-image" />
              <h2>{product.name}</h2>
            </Link>
          </div>
        ))}
      </div>
      {/* Mostrar mensaje si no está autenticado */}
      {user ? (
        <p>Listo para agregar productos al carrito!</p>
      ) : (
        <p>*Debes iniciar sesión para ver precios y agregar al carrito</p>
      )}
    </div>
  );
};

export default Store;
