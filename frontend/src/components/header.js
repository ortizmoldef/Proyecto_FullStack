import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import InsertarPelicula from './insertarPelicula';

const Header = ({ setMessage, setError, setMovies, isLoggedIn, setIsLoggedIn, setRole }) => {
  const location = useLocation();
  const [role, setRoleState] = useState('user');

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    if (userRole) {
      setRoleState(userRole);
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setRoleState('user');
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">📚 Películas</Link>
        </li>
        {role === 'admin' && (
          <li className="nav-item">
            <Link to="/insertar-pelicula" className="nav-link">✍️ Insertar Película</Link>
          </li>
        )}
        <li className="nav-item">
          <Link to="/register" className="nav-link">📝 Registro</Link>
        </li>
        {!isLoggedIn && (
          <li className="nav-item">
            <Link to="/login" className="nav-link">🔑 Iniciar Sesión</Link>
          </li>
        )}
        {isLoggedIn && (
          <li className="nav-item">
            <button onClick={handleLogout} className="nav-link">🚪 Cerrar Sesión</button>
          </li>
        )}
      </ul>

      {location.pathname === '/insertar-pelicula' && (
        <InsertarPelicula setMessage={setMessage} setError={setError} setMovies={setMovies} />
      )}
    </nav>
  );
};

export default Header;
