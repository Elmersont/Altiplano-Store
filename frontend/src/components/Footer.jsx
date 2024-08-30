// src/components/FooterAltiplano.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/FooterAltiplano.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css';

function FooterAltiplano() {
  return (
    <footer className="footer-custom pt-4">
      <Container>
        <Row>
          
          <Col md={4} className="mb-3">
            <h5>Altiplano Store</h5>
            <p>Encuentra las mejores puertas acorde a tu estilo de vida en Altiplano Store. Calidad y diseño único a tu alcance.</p>
          </Col>
          
       
          <Col md={4} className="mb-3">
            <h5>Navegación</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-light text-decoration-none">Inicio</Link>
              </li>
              <li>
                <Link to="/tienda" className="text-light text-decoration-none">Tienda</Link>
              </li>
              <li>
                <Link to="/conocenos" className="text-light text-decoration-none">Conócenos</Link>
              </li>
            </ul>
          </Col>

          <Col md={4} className="mb-3">
            <h5>Síguenos</h5>
            <ul className="list-unstyled d-flex">
              <li className="me-3">
                <a href="#" className="text-light">
                  <i className="bi bi-facebook"></i> 
                </a>
              </li>
              <li className="me-3">
                <a href="#" className="text-light">
                  <i className="bi bi-instagram"></i>
                </a>
              </li>
              <li className="me-3">
                <a href="#" className="text-light">
                  <i className="bi bi-twitter-x"></i>
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="text-center pt-3">
          <Col>
            <p className="mb-0">© 2024 Altiplano Store. Todos los derechos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default FooterAltiplano;