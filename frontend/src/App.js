import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Peliculas from './components/peliculas';
import Register from './components/Register';
import Login from './components/Login';
import Header from './components/header';
import InsertarPelicula from './components/insertarPelicula';  // Importamos el componente de insertar película

function App() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Estado para manejar la sesión del usuario
  const [role, setRole] = useState('user');  // Estado para el rol del usuario

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    if (token) {
      setIsLoggedIn(true);
      setRole(userRole || 'user');  // Si el rol no está definido, asigna 'user' por defecto
    }
  }, []);

  return (
    <Router>
      <div>
        {/* Solo renderizamos Header aquí */}
        <Header setMessage={setMessage} setError={setError} setMovies={setMovies} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setRole={setRole} />
        {/* Rutas para diferentes componentes */}
        <Routes>
          <Route path="/" element={<Peliculas />} />  {/* Página principal con catálogo de películas */}
          <Route path="/insertar-pelicula" element={<InsertarPelicula setMessage={setMessage} setError={setError} setMovies={setMovies} />} />
          <Route path="/register" element={<Register />} />  {/* Página de registro */}
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setRole={setRole} />} />  {/* Página de login */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
