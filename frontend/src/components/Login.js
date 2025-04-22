import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importamos los hooks necesarios para la navegación
import { useAppContext } from '../context/AuthContext'; // Importamos el contexto para la autenticación
import '../css/login.scss'; // Importamos los estilos SCSS para el login
import api from '../axios'; // Importamos el cliente Axios configurado para hacer solicitudes HTTP

const Login = () => {
  const { login } = useAppContext(); // Accedemos al contexto de autenticación para usar la función 'login'
  
  // Definimos los estados para almacenar los valores de los campos del formulario y el mensaje de error
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate(); // Hook para navegar entre las páginas de la aplicación

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene la recarga de la página al enviar el formulario
    setError(''); // Reseteamos el error antes de intentar el login

    try {
      // Realizamos una solicitud POST al backend para autenticar al usuario
      const response = await api.post('/api/login', {
        email,
        password,
      });

      // Si la respuesta contiene un token y un usuario, almacenamos el token y el rol
      if (response.data && response.data.token && response.data.user) {
        login(response.data.token, response.data.user.role); // Llamamos a la función login del contexto con el token y el rol
        navigate('/'); // Redirigimos al usuario a la página principal
      } else {
        console.error('Respuesta del servidor no contiene los datos esperados');
        setError('Error al iniciar sesión'); // Mostramos un error si la respuesta no contiene los datos esperados
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response || error.message); // Imprimimos el error en consola
      setError('Error al iniciar sesión. Verifica los datos e intenta nuevamente.'); // Mostramos un mensaje de error
    }
  };

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
        {/* Si hay un mensaje de error, lo mostramos aquí */}
        {error && <p className="error-message">{error}</p>}
        {/* Enlace para redirigir a la página de registro si el usuario no tiene cuenta */}
        <p>
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
