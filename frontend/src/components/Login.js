import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setIsLoggedIn, setRole }) => {
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
        // Guardar el token y los datos del usuario en el localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('role', response.data.user.role);

        // Actualizar el estado local
        setIsLoggedIn(true);
        setRole(response.data.user.role);  // Actualizar el rol también

        console.log('Inicio de sesión exitoso:', response.data);
        navigate('/');  // Redirigir a la página principal
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
