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
          <Route path="*" element={<h1>Vista no existente</h1>} /> 
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;