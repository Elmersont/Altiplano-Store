import './styles/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Home from './pages/Home';
import NavbarAltiplano from './components/Navbar'; 
import { AuthProvider } from './context/AutentificacionContext';

function App() {
  return (
    <AuthProvider> 
      <BrowserRouter>
        <NavbarAltiplano /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<h1>404 - Página no encontrada</h1>} /> 
          <Route path='/Store' element= {<Store/>} />
          <Route path='/product/:id' element={<ProductDetail/>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;