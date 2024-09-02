import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = [
        { id: 1, name: 'Granjera', imageUrl: 'https://altiplanostore.cl/wp-content/uploads/2021/02/GRANJERA-2-324x324.png', description: ' La línea Granjera son puertas de granero inspiradas en el campesino chileno, esta en particular tiene un diseño de flecha que además de brindar una apariencia rústica da la sensación de movimiento. Esta puerta es el complemento perfecto para espacios con elementos propios distintivos.'},
        { id: 2, name: 'Indómita', imageUrl: 'https://altiplanostore.cl/wp-content/uploads/2021/02/INDOMITA-1-324x324.png', description: 'La línea Indómita, son puertas de granero inspiradas en la flora y fauna de Chile, estas nos cuentan las historia de como cada especie ha luchado por sobrevivir y mantener su libertad en una tierra conquistada y reconquistada. Sus líneas sobrias y colores neutros hacen de este estilo el mejor complemento para espacios modernos.' },
        { id: 3, name: 'Nativa', imageUrl: 'https://altiplanostore.cl/wp-content/uploads/2021/02/NATIVA-1-1-324x324.png', description: 'Línea Nativa, son puertas de granero inspiradas en los pueblos originarios de Chile. Por esto, son fabricadas para ser el centro de atención de cualquier espacio, Kötaish el espíritu Selk’nam es ideal para resaltar en espacios donde un tono plano domina el ambiente.' }
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
    <div className='details'>
        <div className="product-card">
            <div className='card-left'>
                <img src={product.imageUrl} alt={product.name} className="product-image" />
            </div>
            <div className='card-right'>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
            </div>
        </div>
        <button className='btn2'>👤Iniciar Sesión</button>
        <p>*Debes iniciar sesión para ver precios y agregar al carrito</p>
    </div>
  );
};

export default ProductDetails;
