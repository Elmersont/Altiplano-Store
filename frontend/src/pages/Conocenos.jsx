import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../styles/Conocenos.css'; 

const Conocenos = () => {
  return (
    <Container className="py-5 mt-5">
      {/* Sección principal con video e imagen */}
      <Row className="mb-4 align-items-center"> 
        <Col md={6}>
          <Card className="border-0">
            <video
              src="/assets/videos/Canteadora.mp4"
              controls
              autoPlay
              muted
              loop
              className="w-100 rounded shadow-sm"
              style={{ height: '100%', maxHeight: '400px', objectFit: 'cover' }} 
            >
              Tu navegador no soporta el video.
            </video>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="border-0">
            <Card.Img
              src="/assets/images/door1.jpg"
              alt="Imagen de puerta"
              className="rounded shadow-sm"
              style={{ height: '100%', maxHeight: '400px', objectFit: 'cover' }} 
            />
          </Card>
        </Col>
      </Row>

  
      <Row className="text-center">
        <Col md={4} className="py-3">
          <h3>Facilitando tu vida</h3>
          <p>
            Bienvenido a Altiplano Store, donde cada puerta es una obra de arte. Nos especializamos en ofrecer puertas únicas que realzan la belleza de tu hogar.
          </p>
        </Col>
        <Col md={4} className="py-3">
          <h3>Nuestro futuro es eléctrico</h3>
          <p>
            Nuestra misión es transformar espacios a través de diseños innovadores y materiales de la más alta calidad. Creemos que cada puerta cuenta una historia.
          </p>
        </Col>
        <Col md={4} className="py-3">
          <h3>Protegiendo lo que es importante</h3>
          <p>
            Altiplano Store está comprometido con la excelencia y la satisfacción del cliente, ofreciendo puertas que combinan diseño y funcionalidad.
          </p>
        </Col>
      </Row>


      <Row className="text-center mt-5">
        <Col>
          <Button variant="dark" size="lg" href="/contacto" className="px-4">
            Contáctanos
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Conocenos;
