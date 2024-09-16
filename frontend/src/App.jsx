import React from 'react';
import './styles/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Cuestionario from './components/CuestionarioClientes/Cuestionario.jsx';
import CuestionarioPersonalizacion from './components/CuestionarioClientes/CuestionarioPersonalizacion.jsx'; // Importamos el cuestionario personalizado
import Login from './components/Usuarios/Login.jsx';
import RecuperarContrasena from './components/Usuarios/RecuperarContrasena.jsx';
import Registro from './components/Usuarios/Registro.jsx';
import PerfilUsuario from './components/Usuarios/PerfilUsuario.jsx';
import MisFavoritos from './components/Usuarios/MisFavoritos.jsx';
import Store from './pages/Store';
import ProductDetail from './pages/ProductDetail';
import NavbarAltiplano from './components/Navbar.jsx';
import Conocenos from './pages/Conocenos';
import Carrito from './components/CarritoCompras/Carrito'; 
import { AuthProvider } from './context/AutentificacionContext.jsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavbarAltiplano />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cuestionario" element={<Cuestionario />} />
          <Route path="/personalizacion" element={<CuestionarioPersonalizacion />} />
          <Route path="/configurar-lienzo/:id" element={<CuestionarioPersonalizacion />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recuperar-contrasena" element={<RecuperarContrasena />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/perfil" element={<PerfilUsuario />} />
          <Route path="/perfil/favoritos" element={<MisFavoritos />} />
          <Route path="/conocenos" element={<Conocenos />} />
          <Route path="/store" element={<Store />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/carrito" element={<Carrito />} /> 
          <Route path="*" element={<h1>Vista no existente</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
