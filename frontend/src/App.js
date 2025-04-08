import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Peliculas from './components/peliculas';
import Register from './components/Register';
import Login from './components/Login';
import Header from './components/header';
import InsertarPelicula from './components/insertarPelicula';
import EditarPelicula from './components/EditarPelicula';
import { AppProvider } from './context/AuthContext';  // Asegúrate de importar correctamente

function App() {
  return (
    <AppProvider>  {/* Proveedor del contexto */}
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Peliculas />} />
            <Route path="/insertar-pelicula" element={<InsertarPelicula />} />
            <Route path="/editar-pelicula/:id" element={<EditarPelicula />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;