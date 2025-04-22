import React from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../hook/useLogin'; // Importamos el hook personalizado
import '../styles/login.scss'; // Importamos los estilos SCSS para el login

const Login = () => {
  const { email, setEmail, password, setPassword, error, handleSubmit } = useLogin();

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Iniciar Sesión</h2>
        {/* Formulario para el inicio de sesión */}
        <form onSubmit={handleSubmit}>
          {/* Campo de entrada para el correo electrónico */}
          <div className="input-group">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Actualizamos el estado de 'email' cuando el usuario escribe
              required
            />
          </div>
          {/* Campo de entrada para la contraseña */}
          <div className="input-group">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Actualizamos el estado de 'password' cuando el usuario escribe
              required
            />
          </div>
          {/* Botón para enviar el formulario */}
          <button type="submit" className="btn">Iniciar sesión</button>
        </form>
        
        {/* Mostrar mensaje de error solo si existe */}
        {error && (
          <p className="error-message">{error}</p>
        )}

        {/* Enlace para redirigir a la página de registro si el usuario no tiene cuenta */}
        <p>
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
