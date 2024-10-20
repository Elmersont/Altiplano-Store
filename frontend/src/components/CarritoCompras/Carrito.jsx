import React, { useState, useEffect } from 'react';
import NavbarAltiplano from '../Navbar';
import FooterAltiplano from '../Footer';
import "../../styles/Carrito.css";

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const [products, setProducts] = useState([]);  // Definir el estado para los productos

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(carritoGuardado);
  }, []);

  const eliminarDelCarrito = (id) => {
    const nuevoCarrito = carrito.filter(product => product.id !== id);
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito)); 
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    const updatedCarrito = carrito.map(item =>
      item.id === id ? { ...item, quantity: nuevaCantidad } : item
    );
    setCarrito(updatedCarrito);
    localStorage.setItem('carrito', JSON.stringify(updatedCarrito));
  };

  const calcularTotal = () => {
    return carrito
      .reduce((total, product) => total + (product.price || 0) * (product.quantity || 1), 0)
      .toLocaleString('es-CL');
  };

  // Cargar productos adicionales si es necesario
  useEffect(() => {
    const fetchProducts = async () => {
      const data = [
        { id: 1, name: 'Granjera', imageUrl: '/assets/images/GRANJERA.png', description: ' Puerta Granjera de estilo rústico.' },
        { id: 2, name: 'Indómita', imageUrl: '/assets/images/INDOMITA.png', description: 'Puerta Indómita, de diseño moderno.' },
        { id: 3, name: 'Nativa', imageUrl: '/assets/images/NATIVA.png', description: 'Puerta Nativa, inspirada en los pueblos originarios.' }
      ];
      setProducts(data);  // Actualiza el estado de productos
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="carrito-container">
        <NavbarAltiplano />
        <h1>Tu Carrito de Compras</h1>

        {carrito.length === 0 ? (
          <p>Tu carrito está vacío</p>
        ) : (
          <>
            <table className="carrito-table">
              <thead>
                <tr>
                  <th>Eliminar</th>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((product, index) => (
                  <tr key={product.id || index}>
                    <td>
                      <button 
                        title="Eliminar producto" 
                        onClick={() => eliminarDelCarrito(product.id)} 
                        className="eliminar-producto"
                      >
                        ✖
                      </button>
                    </td>
                    <td>
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="imagen-producto" 
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }} 
                      />
                    
                        <strong>{product.name}</strong> <br/>
                      
                    </td>
                    <td>
                      ${product.price ? product.price.toLocaleString('es-CL') : 'N/A'}
                    </td>
                    <td>
                      <input 
                        type="number" 
                        value={product.quantity || 1} 
                        min="1" 
                        onChange={(e) => actualizarCantidad(product.id, parseInt(e.target.value, 10))}
                      />
                    </td>
                    <td>
                      ${(product.price && product.quantity ? (product.price * product.quantity).toLocaleString('es-CL') : 'N/A')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="carrito-totales">
              <p><strong>Total:</strong> ${calcularTotal()}</p>
              <button className="btn-finalizar-compra">Finalizar compra</button>
            </div>
          </>
        )}
      </div>
      <FooterAltiplano />
    </>
  );
};

export default Carrito;