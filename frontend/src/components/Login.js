import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AuthContext';
import '../css/login.scss';
import api from '../axios'; // Importamos el cliente Axios configurado

const Login = () => {
  const { login } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/login', {
        email,
        password,
      });

      if (response.data && response.data.token && response.data.user) {
        login(response.data.token, response.data.user.role);
        navigate('/');
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
