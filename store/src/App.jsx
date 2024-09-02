import './App.css'
import Store from './views/Store'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetail from './views/ProductDetail';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/' element= {<Store/>} />
        <Route path='/product/:id' element={<ProductDetail/>} />
        <Route path="*" element={<div>404 - Página no encontrada</div>} />
      </Routes>
    </Router>
  )
}

export default App
