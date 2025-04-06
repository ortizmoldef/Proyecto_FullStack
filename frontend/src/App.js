import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Peliculas from './components/peliculas';
import Register from './components/Register';
import Login from './components/Login';
import Header from './components/header';
import InsertarPelicula from './components/insertarPelicula';

function App() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  
  const [role, setRole] = useState('user');  

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    if (token) {
      setIsLoggedIn(true);
      setRole(userRole || 'user');
    }
  }, []);

  return (
    <Router>
      <div>
        <Header setMessage={setMessage} setError={setError} setMovies={setMovies} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setRole={setRole} />
        <Routes>
          <Route path="/" element={<Peliculas />} />
          <Route path="/insertar-pelicula" element={<InsertarPelicula />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setRole={setRole} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
