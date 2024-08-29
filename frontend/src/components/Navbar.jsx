import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../context/AutentificacionContext';
import '../styles/NavbarAltiplano.css'; 

const logoNavbar = '/assets/images/logoNavbar.png';

function NavbarAltiplano() {
  const { user, login, logout } = useAuth(); //  estado y funcion del contexto de autenticación

  // Función para simular el inicio de sesión SACAR CUANDOO TENGAMOS EL FORMULARIO
  const handleLogin = () => {
    const userName = prompt('Introduce tu nombre'); // Solicitar el nombre del usuario
    const userRole = prompt('Introduce tu rol (admin/user)'); // Solicitar el rol (admin o user)
    if (userName && (userRole === 'admin' || userRole === 'user')) {
      login(userName, userRole); // Ejecuta la función de login con el nombre y rol
    } else {
      alert('Rol no válido, usa "admin" o "user"'); // Mensaje de error si el rol es incorrecto
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
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
            <Nav.Link className="nav-item-hover">
              <span className="nav-text">Inicio</span>
              <button className="custom-button">Inicio</button>
            </Nav.Link>
            <Nav.Link className="nav-item-hover">
              <span className="nav-text">Tienda</span>
              <button className="custom-button">Tienda</button>
            </Nav.Link>
            <Nav.Link className="nav-item-hover">
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
                  Hola, {user.name} 
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