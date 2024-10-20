import React from 'react';

const ItemCarrito = ({ product, eliminarDelCarrito, actualizarCantidad }) => {
  return (
    <tr>
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
        />
        <span>{product.name} - {product.dimensions}</span>
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
  );
};

export default ItemCarrito;