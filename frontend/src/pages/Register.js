import React from 'react';
import { Link } from 'react-router-dom';
import useRegister from '../hook/useRegister'; // Importamos el hook personalizado
import '../styles/register.scss'; // Importamos los estilos SCSS para el formulario

const Register = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    handleSubmit,
  } = useRegister();

  return (
    <div className="page-container">
      <div className="register-container">
        <div className="register-form">
          <h2>Registrarse</h2>
          {/* Formulario para registrar un nuevo usuario */}
          <form onSubmit={handleSubmit}>
            {/* Campo para el nombre */}
            <div className="input-group">
              <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)} // Actualiza el estado de 'name' cuando el usuario escribe
                required // Asegura que el campo sea obligatorio
              />
            </div>
            {/* Campo para el correo electrónico */}
            <div className="input-group">
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Actualiza el estado de 'email' cuando el usuario escribe
                required
              />
            </div>
            {/* Campo para la contraseña */}
            <div className="input-group">
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Actualiza el estado de 'password'
                required
              />
            </div>
            {/* Campo para confirmar la contraseña */}
            <div className="input-group">
              <input
                type="password"
                placeholder="Confirmar Contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} // Actualiza el estado de 'confirmPassword'
                required
              />
            </div>
            {/* Botón de submit para enviar el formulario */}
            <button className="register-button" type="submit">Registrar</button>
          </form>
          {/* Si hay un mensaje de error, lo mostramos aquí */}
          {error && <p className="error-message">{error}</p>}
          {/* Enlace para redirigir al usuario a la página de login si ya tiene cuenta */}
          <p>
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
