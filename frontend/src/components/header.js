import React from 'react';
import { Link } from 'react-router-dom'; // Importamos el componente Link para la navegación
import { FaFilm, FaSignInAlt, FaSignOutAlt, FaUserPlus, FaPlusCircle } from 'react-icons/fa'; // Iconos de react-icons
import { useAppContext } from '../context/AuthContext';  // Importamos el contexto de autenticación
import '../css/header.scss'; // Importamos los estilos SCSS para el header

const Header = () => {
  // Accedemos al estado de autenticación y funciones del contexto
  const { isLoggedIn, role, logout, error } = useAppContext();  // isLoggedIn: estado de autenticación, role: rol del usuario, logout: función para cerrar sesión, error: mensaje de error

  return (
    <nav className="navbar">
      <ul className="nav-list">
        {/* Si el usuario está autenticado, mostramos el enlace a las películas */}
        {isLoggedIn && (
          <li className="nav-item">
            <Link to="/" className="nav-link"><FaFilm /> Películas</Link>
          </li>
        )}

        {/* Si el usuario es un administrador, mostramos el enlace para insertar una nueva película */}
        {isLoggedIn && role === 'admin' && (
          <li className="nav-item">
            <Link to="/insertar-pelicula" className="nav-link"><FaPlusCircle /> Insertar Película</Link>
          </li>
        )}

        {/* Si el usuario es un administrador, mostramos el enlace para modificar una película */}
        {isLoggedIn && role === 'admin' && (
          <li className="nav-item">
            <Link to="/modificar_pelicula" className="nav-link"><FaPlusCircle /> Modificar Película</Link>
          </li>
        )}

        {/* Si el usuario no está autenticado, mostramos los enlaces de registro e inicio de sesión */}
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

        {/* Si el usuario está autenticado, mostramos el botón para cerrar sesión */}
        {isLoggedIn && (
          <li className="nav-item">
            <button onClick={logout} className="nav-link"><FaSignOutAlt /> Cerrar Sesión</button>
          </li>
        )}
      </ul>

      {/* Mostrar mensajes de error si existen */}
      {error && <p className="error">{error}</p>}
    </nav>
  );
};

export default Header;
