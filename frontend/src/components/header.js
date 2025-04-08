import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFilm, FaSignInAlt, FaSignOutAlt, FaUserPlus, FaPlusCircle } from 'react-icons/fa';
import { useAppContext } from '../context/AuthContext';  // Importa el contexto
import '../css/header.scss'; // Importamos el archivo SASS

const Header = () => {
  const { isLoggedIn, role, logout, message, error } = useAppContext();  // Accede al contexto

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link"><FaFilm /> Películas</Link>
        </li>
        {role === 'admin' && (
          <li className="nav-item">
            <Link to="/insertar-pelicula" className="nav-link"><FaPlusCircle /> Insertar Película</Link>
          </li>
        )}
        <li className="nav-item">
          <Link to="/register" className="nav-link"><FaUserPlus /> Registro</Link>
        </li>
        {!isLoggedIn && (
          <li className="nav-item">
            <Link to="/login" className="nav-link"><FaSignInAlt /> Iniciar Sesión</Link>
          </li>
        )}
        {isLoggedIn && (
          <li className="nav-item">
            <button onClick={logout} className="nav-link"><FaSignOutAlt /> Cerrar Sesión</button>
          </li>
        )}
      </ul>

      {/* Mostrar mensajes de error o éxito */}
      {message && <p className="message">{message}</p>}
      {error && <p className="error">{error}</p>}
    </nav>
  );
};

export default Header;
