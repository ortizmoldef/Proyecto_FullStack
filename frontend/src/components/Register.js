import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';  // Asegúrate de agregar esta importación
import '../css/register.scss';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name || !email || !password || !confirmPassword) {
      alert('Todos los campos son obligatorios');
      return;
    }
  
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        name,
        email,
        password,
      });
  
      // Verificar si el backend devolvió una respuesta exitosa
      if (response.data && response.data.message === 'Usuario registrado con éxito.') {
        alert('Registro exitoso');
        navigate('/');  // Redirige a la página principal
      } else {
        alert(response.data.message || 'Error al registrar el usuario');
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      // Mostrar el mensaje de error recibido desde el backend si existe
      alert('Error al registrar el usuario: ' + error.response?.data?.message || 'Error desconocido');
    }
  };
  
  return (
    <div className="page-container">
      <div className="register-container">
        <div className="register-form">
          <h2>Registrarse</h2>
          <form onSubmit={handleSubmit}>
          <div className="input-group">
              <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
            <div className="input-group">
              <input
                type="password"
                placeholder="Confirmar Contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button className="register-button" type="submit">Registrar</button>
          </form>
          <p>
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link> {/* Reemplaza el <a> por <Link> */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
