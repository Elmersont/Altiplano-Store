// src/pages/Conocenos.jsx
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'; 
import NavbarAltiplano from '../components/Navbar';
import FooterAltiplano from '../components/Footer';
import '../styles/Conocenos.css';

const Conocenos = () => {
  return (
    <>
    <Container className="margen"> 
      <NavbarAltiplano />
      <Row className="text-center mb-4">
        <Col>
          <h1 className="display-4">Conócenos</h1>
          <p className="lead">
            Bienvenido a Altiplano Store, donde cada puerta es una obra de arte. Nos especializamos en ofrecer puertas únicas que realzan la belleza de tu hogar.
          </p>
        </Col>
      </Row>
      <Row className="align-items-center mb-5">
        <Col md={6}>
          <Card className="border-3">
            <Card.Img 
              src="/assets/images/FOTO PERFIL.png" 
              alt="Nuestro Equipo" 
              className="rounded shadow-sm"
            />
          </Card>
        </Col>
        <Col md={6}>
          <h3>Nuestra Historia</h3>
          <p>
            Desde nuestros inicios, Altiplano Store ha estado comprometido con la excelencia y la satisfacción del cliente. Nacimos de la pasión por el diseño y la arquitectura.
          </p>
          <h3 className="mt-4">Nuestra Misión</h3>
          <p>
            Nuestra misión es transformar espacios a través de diseños innovadores y materiales de la más alta calidad. Creemos que cada puerta cuenta una historia.
          </p>
        </Col>
      </Row>
      <Row className="text-center">
        <Col>
          <Button variant="dark" size="lg" href="/contacto">Contáctanos</Button>
        </Col>
      </Row>
    </Container>
    <FooterAltiplano />
    </>
  );
};

export default Conocenos;