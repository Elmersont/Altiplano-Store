import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap'; 
import { useNavigate, Link } from 'react-router-dom';
import NavbarAltiplano from '../components/Navbar';
import FooterAltiplano  from '../components/Footer';
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = [
        { id: 1, name: 'Granjera', imageUrl: 'https://altiplanostore.cl/wp-content/uploads/2021/02/GRANJERA-2-324x324.png', description: ' Puerta Granjera de estilo rústico.' },
        { id: 2, name: 'Indómita', imageUrl: '/assets/images/INDOMITA.png', description: 'Puerta Indómita, de diseño moderno.' },
        { id: 3, name: 'Nativa', imageUrl: 'https://altiplanostore.cl/wp-content/uploads/2021/02/NATIVA-1-1-324x324.png', description: 'Puerta Nativa, inspirada en los pueblos originarios.' }
      ];
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleButtonClick = () => {
    navigate('/personalizacion');
  };

  return (
    <>
      <NavbarAltiplano />
      
      <section className="hero-section d-flex align-items-center justify-content-center text-center">
        <Container className='texto-hero'>
          <Row className="justify-content-evenly products-grid">
            <Col>
              <h1 className="display-4 text-dark">Altiplano Store</h1>
              <p className="lead">
                Cada puerta es un lienzo en blanco, y cada una de nuestras obras busca manifestar ese arte que sólo se puede ver y vivir en tu hogar. 
              </p>
              <Button variant="primary" size="lg" className="mt-3" onClick={handleButtonClick}>
                Personaliza tu puerta aquí
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
      <Container className="main-content">
        <h2 className="mt-3 mb-5">Nuestros Productos</h2>
        <Row className="justify-content-evenly products-grid">
          {products.map(product => (
            <Col key={product.id} xs={12} sm={4} md={3} className="mb-4">
              <div className="product-card">
                <Link to={`/product/${product.id}`} className="product-link">
                  <img src={product.imageUrl} alt={product.name} className="product-image" />
                  <h2>{product.name}</h2>
                </Link>
              </div>
            </Col>
          ))}
        </Row>
        <div className="view-more text-center mt-4">
          <Button variant="dark" size="lg" onClick={() => navigate('/store')}>
            Ver más productos
          </Button>
        </div>
      </Container>
      <FooterAltiplano />
    </>
  );
}

export default Home;