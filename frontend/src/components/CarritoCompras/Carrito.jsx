// Carrito.jsx
import React, { useState, useEffect } from 'react';

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
     const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(carritoGuardado);
  }, []);

  const eliminarDelCarrito = (id) => {
    const nuevoCarrito = carrito.filter(producto => producto.id !== id);
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito)); // Actualiza localStorage
  };

  return (
    <div className="carrito-container">
      <h1>Tu Carrito de Compras</h1>
      {carrito.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <div className="productos-carrito">
          {carrito.map(producto => (
            <div key={producto.id} className="producto-carrito">
              <img src={producto.imageUrl} alt={producto.name} className="imagen-producto" />
              <h2>{producto.name}</h2>
              <button onClick={() => eliminarDelCarrito(producto.id)}>Eliminar</button>
            </div>
          ))}
        </div>
      )}
      <button className="btn-comprar">Finalizar Compra</button>
    </div>
  );
};

export default Carrito;
