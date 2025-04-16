import React from 'react';
import { Link } from 'react-router-dom';
import { FaFilm, FaSignInAlt, FaSignOutAlt, FaUserPlus, FaPlusCircle } from 'react-icons/fa';
import { useAppContext } from '../context/AuthContext';  // Importa el contexto
import '../css/header.scss'; // Importamos el archivo SASS

const Header = () => {
  const { isLoggedIn, role, logout, error } = useAppContext();  // Accede al contexto

  return (
    <nav className="navbar">
      <ul className="nav-list">
        {isLoggedIn && (
          <li className="nav-item">
            <Link to="/" className="nav-link"><FaFilm /> Películas</Link>
          </li>
        )}
        {isLoggedIn && role === 'admin' && (
          <li className="nav-item">
            <Link to="/insertar-pelicula" className="nav-link"><FaPlusCircle /> Insertar Película</Link>
          </li>
        )}

          {isLoggedIn && role === 'admin' && (
          <li className="nav-item">
            <Link to="/modificar_pelicula" className="nav-link"><FaPlusCircle /> Modificar Película</Link>
          </li>
        )}

        {!isLoggedIn && (
          <>
            <li className="nav-item">
              <Link to="/register" className="nav-link"><FaUserPlus /> Registro</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link"><FaSignInAlt /> Iniciar Sesión</Link>
            </li>
          </>
        )}
        {isLoggedIn && (
          <li className="nav-item">
            <button onClick={logout} className="nav-link"><FaSignOutAlt /> Cerrar Sesión</button>
          </li>
        )}
      </ul>

      {/* Mostrar mensajes de error */}
      {error && <p className="error">{error}</p>}
    </nav>
  );
};

export default Header;
