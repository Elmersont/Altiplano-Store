import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../context/AutentificacionContext';
import '../styles/NavbarAltiplano.css'; 

const logoNavbar = '/assets/images/logoNavbar.png';

function NavbarAltiplano() {
  const { user, logout } = useAuth(); // Retira la función de login simulada
  const navigate = useNavigate(); // Hook para redireccionar

  // Función para simular el inicio de sesión SACAR CUANDOO TENGAMOS EL FORMULARIO
  const handleLogin = () => {
    navigate('/login'); // Redirige a la página de login
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary navbar-fixed-top" fixed="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logoNavbar}
            alt="Logo Altiplano Store"
            className="d-inline-block align-top"
            width="170"
            height="60"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="nav-item-hover">
              <span className="nav-text">Inicio</span>
              <button className="custom-button">Inicio</button>
            </Nav.Link>
            <Nav.Link as={Link} to="/tienda" className="nav-item-hover">
              <span className="nav-text">Tienda</span>
              <button className="custom-button">Tienda</button>
            </Nav.Link>
            <Nav.Link as={Link} to="/conocenos" className="nav-item-hover">
              <span className="nav-text">Conócenos</span>
              <button className="custom-button">Conócenos</button>
            </Nav.Link>
            {user?.role === 'admin' && (
              <button className="rol-button">Panel Admin</button>
            )}
          </Nav>
          <Nav>
            {user ? (
              <>
                <span className="navbar-text me-3">
                  Bienvenido {user.name} 
                </span>
                <button className="cerrar-button" onClick={logout}>
                  Cerrar sesión
                </button>
              </>
            ) : (
             
              <button className="login-button" onClick={handleLogin}>
                👤 Iniciar sesión
              </button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarAltiplano;
