import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../context/AutentificacionContext'; 
import '../styles/NavbarAltiplano.css'; 

const logoNavbar = '/assets/images/logoNavbar.png';

function NavbarAltiplano() {
  const { user, logout, loading } = useAuth(); 
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login'); 
  };

  const handleProfile = () => {
    navigate('/perfil'); 
  };

  const handleCarrito = () => {
    navigate('/Carrito'); 
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
            {user?.role === 'admin' && (
              <button className="rol-button">Panel Admin</button>
            )}
          </Nav>
          <Nav>
            {loading ? (
              <span className="navbar-text me-3">Cargando...</span>
            ) : user ? (
              <>
                <span className="navbar-text me-3">
                  Bienvenido {user.name} 
                </span>
                <button className="profile-button mx-3" onClick={handleProfile}>
                  Mi Perfil
                </button>
                <button className="profile-button2" onClick={handleCarrito}>
                🛒
                </button>
                <button className="cerrar-button mx-3" onClick={logout}>
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