import React, { useState, useEffect } from 'react';
import NavbarAltiplano from '../Navbar';
import FooterAltiplano from '../Footer';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = [
        { id: 1, name: 'Granjera', imageUrl: 'https://altiplanostore.cl/wp-content/uploads/2021/02/GRANJERA-2-324x324.png', description: 'La línea Granjera son puertas de granero inspiradas en el campesino chileno.' },
        { id: 2, name: 'Indómita', imageUrl: 'https://altiplanostore.cl/wp-content/uploads/2021/02/INDOMITA-1-324x324.png', description: 'La línea Indómita, son puertas de granero inspiradas en la flora y fauna de Chile.' },
        { id: 3, name: 'Nativa', imageUrl: 'https://altiplanostore.cl/wp-content/uploads/2021/02/NATIVA-1-1-324x324.png', description: 'Línea Nativa, son puertas de granero inspiradas en los pueblos originarios de Chile.' }
      ];
      const foundProduct = data.find(p => p.id === parseInt(id));
      setProduct(foundProduct);
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const agregarAlCarrito = () => {
    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
    carritoActual.push(product);
    localStorage.setItem('carrito', JSON.stringify(carritoActual));
    alert('Producto añadido al carrito');
  };

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
                <button onClick={agregarAlCarrito} className='btn2'>Añadir al Carrito</button>
            </div>
        </div>
    </div>
    <FooterAltiplano />
    </>
  );
};

export default ProductDetails;
