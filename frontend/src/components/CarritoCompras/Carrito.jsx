import React, { useState, useEffect } from 'react';
import NavbarAltiplano from '../Navbar';
import "../../styles/Carrito.css";

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(carritoGuardado);
  }, []);

  const eliminarDelCarrito = (id) => {
    const nuevoCarrito = carrito.filter(producto => producto.id !== id);
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito)); 
  };

  const calcularTotal = () => {
    return carrito
      .reduce((total, producto) => total + (producto.price || 0) * (producto.quantity || 1), 0)
      .toLocaleString('es-CL');
  };

  return (
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
                <th></th> {/* Columna para el botón de eliminar */}
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map(producto => (
                <tr key={producto.id}>
                  <td>
                    <button 
                      title="Eliminar producto" 
                      onClick={() => eliminarDelCarrito(producto.id)} 
                      className="eliminar-producto"
                    >
                      ✖
                    </button>
                  </td>
                  <td>
                    <img src={producto.imageUrl} alt={producto.name} className="imagen-producto" />
                    <span>{producto.name} - {producto.dimensions}</span> {/* Producto con dimensiones */}
                  </td>
                  <td>
                    ${producto.price ? producto.price.toLocaleString('es-CL') : 'N/A'}
                  </td>
                  <td>
                    <input 
                      type="number" 
                      value={producto.quantity || 1} 
                      min="1" 
                      onChange={(e) => {
                        const updatedCarrito = carrito.map(item =>
                          item.id === producto.id ? { ...item, quantity: parseInt(e.target.value, 10) || 1 } : item
                        );
                        setCarrito(updatedCarrito);
                        localStorage.setItem('carrito', JSON.stringify(updatedCarrito));
                      }} 
                    />
                  </td>
                  <td>
                    ${(producto.price && producto.quantity ? (producto.price * producto.quantity).toLocaleString('es-CL') : 'N/A')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="carrito-totales">
            <div className="aplicar-cupon">
              <input type="text" placeholder="Código de cupón" className="input-cupon" />
              <button className="btn-aplicar-cupon">Aplicar cupón</button>
            </div>

            <div className="totales-carrito">
              <p><strong>Subtotal:</strong> ${calcularTotal()}</p>
              <p><strong>Envío:</strong> Introduce tu dirección para ver las opciones de envío.</p>
              <p><strong>Total:</strong> ${calcularTotal()}</p>
            </div>
          </div>

          <button className="btn-finalizar-compra">Finalizar compra</button>
        </>
      )}
    </div>
  );
};

export default Carrito;
