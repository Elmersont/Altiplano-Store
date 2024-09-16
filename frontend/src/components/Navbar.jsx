import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../context/AutentificacionContext'; 
import '../styles/NavbarAltiplano.css'; 
 

const logoNavbar = '/assets/images/logoNavbar.png';

function NavbarAltiplano() {
  const { user, logout } = useAuth(); 
  const navigate = useNavigate(); // Hook para redireccionar

 
  const handleLogin = () => {
    navigate('/login'); 
  };

 
  const handleProfile = () => {
    navigate('/perfil'); 
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
            <Nav.Link as={Link} to="/store" className="nav-item-hover">
              <span className="nav-text">Tienda</span>
              <button className="custom-button">Tienda</button>
            </Nav.Link>
            <Nav.Link as={Link} to="/conocenos" className="nav-item-hover">
              <span className="nav-text">Conócenos</span>
              <button className="custom-button">Conócenos</button>
            </Nav.Link>
            {/* Si el usuario es administrador, mostrar el botón de Admin */}
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
                <button className="profile-button" onClick={handleProfile}>
                  Mi Perfil
                </button>
                <button className="cerrar-button" onClick={logout}>
                  Cerrar sesión
                </button>
              </>
            ) : (
              /* Mostrar "Iniciar sesión" si no está autenticado */
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
