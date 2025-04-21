import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Peliculas from './components/peliculas';
import InsertarPelicula from './components/insertarPelicula';
import EditarPelicula from './components/EditarPelicula';
import FichaPelicula from './components/FichaPelicula';
import Header from './components/header';
import Footer from './components/Footer';
import AdminPeliculas from './components/AdminPeliculas';
import PrivateRoute from './context/privateRoute'; // Importa PrivateRoute

function App() {
  return (
    <Router>
      <AppProvider>
        <div className="App">
          <Header />
          <main>
            <Routes>
              {/* Rutas públicas */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Rutas protegidas */}
              <Route element={<PrivateRoute />}>
              <Route path="/" element={<Peliculas />} />
                <Route path="/insertar-pelicula" element={<InsertarPelicula />} />
                <Route path="/modificar_pelicula" element={<AdminPeliculas />} />
                <Route path="/modificar_pelicula/:id" element={<EditarPelicula />} />
                <Route path="/obtener_peliculas/:id" element={<FichaPelicula />} />
              </Route>
            </Routes> 
          </main>
          <Footer />
        </div>
      </AppProvider>
    </Router>
  );
}

export default App;
