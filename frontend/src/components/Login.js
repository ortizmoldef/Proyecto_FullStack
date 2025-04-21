import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AuthContext'; // Asegúrate de tener los métodos adecuados en el contexto
import useApiUrl from '../hook';  // Importa el hook useApiUrl para obtener la URL correcta
import '../css/login.scss'; // Asegúrate de tener los estilos adecuados

const Login = () => {
  const { login } = useAppContext(); // Usamos el método login del contexto
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  // Llama al hook para obtener la URL de la API según el entorno
  const apiUrl = useApiUrl();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reseteamos cualquier error previo
    
    try {
      const response = await axios.post(`${apiUrl}/api/login`, {
        email,
        password,
      });
  
      if (response.data && response.data.token && response.data.user) {
        // Llamamos a login para guardar el token y rol
        login(response.data.token, response.data.user.role);
        navigate('/'); // Redirigimos a la página principal después de loguearse
      } else {
        console.error('Respuesta del servidor no contiene los datos esperados');
        setError('Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response || error.message);
      setError('Error al iniciar sesión. Verifica los datos e intenta nuevamente.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">Iniciar sesión</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p>
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
