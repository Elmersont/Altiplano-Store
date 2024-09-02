import React from 'react';
import FooterAltiplano from '../components/Footer.jsx';
import { Container, Row, Col, Button } from 'react-bootstrap'; 
import '../styles/Home.css';

function Home() {
  return (
    <>
      <section className="hero-section d-flex align-items-center justify-content-center text-center">
        <Container className='texto-hero'>
          <Row>
            <Col>
              <h1 className="display-4 text-dark">Altiplano Store</h1>
              <p className="lead">
                Cada puerta es un lienzo en blanco, y cada una de nuestras obras busca manifestar ese arte que sólo se puede ver y vivir en tu hogar. 
              </p>
              <Button variant="primary" size="lg" className="mt-3">
                Personaliza tu puerta aquí
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      
      <div className="main-content">
        <h2>Nuestros Productos</h2>
        <p>Explora nuestra variedad de productos para encontrar los que mejor se adapten a tu estilo.</p>
      </div>

      <FooterAltiplano />
    </>
  );
}

export default Home;