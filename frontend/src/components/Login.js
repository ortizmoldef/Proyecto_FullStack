import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AuthContext';  // Importa el contexto

const Login = () => {
  const { login, setIsLoggedIn, setRole } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password
      });

      if (response.data && response.data.token && response.data.user) {
        // Llamar al método login del contexto
        login(response.data.token, response.data.user.role);

        // Redirigir al inicio
        navigate('/');
      } else {
        console.error('Respuesta del servidor no contiene los datos esperados');
        alert('Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response || error.message);
      alert('Error al iniciar sesión. Verifica los datos e intenta nuevamente.');
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
