import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Peliculas from './components/peliculas';
import Register from './components/Register';
import Login from './components/Login';
import Header from './components/header';
import Footer from './components/Footer';
import InsertarPelicula from './components/insertarPelicula';
import EditarPelicula from './components/EditarPelicula';
import FichaPelicula from './components/FichaPelicula';
import { AppProvider } from './context/AuthContext';  // Asegúrate de importar correctamente

function App() {
  return (
    <AppProvider>  {/* Proveedor del contexto */}
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Peliculas />} />
              <Route path="/insertar-pelicula" element={<InsertarPelicula />} />
              <Route path="/modificar_pelicula/:id" element={<EditarPelicula />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/obtener_peliculas/:id" element={<FichaPelicula />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;