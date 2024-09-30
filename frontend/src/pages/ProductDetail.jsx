import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavbarAltiplano from '../components/Navbar';
import FooterAltiplano from '../components/Footer';
import { useAuth } from '../context/AutentificacionContext';
import '../styles/ProductDetail.css'

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const data = [
        { id: 1, name: 'Granjera', price: 189990, imageUrl: 'https://altiplanostore.cl/wp-content/uploads/2021/02/GRANJERA-2-324x324.png', description: 'La línea Granjera son puertas de granero inspiradas en el campesino chileno, esta en particular tiene un diseño de flecha que además de brindar una apariencia rústica da la sensación de movimiento.' },
        { id: 2, name: 'Indómita', price: 279390, imageUrl: 'https://altiplanostore.cl/wp-content/uploads/2021/02/INDOMITA-1-324x324.png', description: 'La línea Indómita son puertas de granero inspiradas en la flora y fauna de Chile.' },
        { id: 3, name: 'Nativa', price: 303000, imageUrl: 'https://altiplanostore.cl/wp-content/uploads/2021/02/NATIVA-1-1-324x324.png', description: 'Línea Nativa, son puertas de granero inspiradas en los pueblos originarios de Chile.' }
      ];
      const foundProduct = data.find(p => p.id === parseInt(id));
      setProduct(foundProduct);
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <>
    <div className='details'>
      <NavbarAltiplano />
      <div className="product-card">
        <div className='card-left'>
          <img src={product.imageUrl} alt={product.name} className="product-image" />
        </div>
        <div className='card-right'>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p><strong>Precio desde:</strong> ${product.price.toLocaleString('es-CL')}</p>
        </div>
      </div>

      {/* Mostrar botón si el usuario ha iniciado sesión */}
      {user ? (
        <button 
          className='btn2' 
          onClick={() => navigate(`/configurar-lienzo/${product.id}`)}
        >
          Configurar mi lienzo
        </button>
      ) : (
        <p>*Debes iniciar sesión para ver precios y configurar tu lienzo</p>
      )}
    </div>
    <FooterAltiplano />
    </>
  );
};

export default ProductDetails;
