import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';  // Asegúrate de agregar esta importación para poder usar <Link>
import '../css/register.scss'; // Importamos el archivo de estilo SCSS para el formulario
import api from '../axios'; // Importamos el cliente Axios configurado para hacer solicitudes HTTP

const Register = () => {
  // Definimos los estados para almacenar los valores de los campos del formulario
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const navigate = useNavigate(); // Hook para navegar entre las páginas de la aplicación

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario (recarga de la página)
  
    // Verificamos si todos los campos están llenos
    if (!name || !email || !password || !confirmPassword) {
      alert('Todos los campos son obligatorios'); // Muestra un mensaje de alerta si algún campo está vacío
      return;
    }
  
    // Verificamos si las contraseñas coinciden
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden'); // Si las contraseñas no coinciden, muestra un mensaje de alerta
      return;
    }
  
    try {
      // Hacemos una solicitud POST al backend para registrar al usuario
      const response = await api.post(`/api/register`, {
        name,
        email,
        password,
      });
  
      // Verificamos si la respuesta del backend es exitosa
      if (response.data && response.data.message === 'Usuario registrado con éxito.') {
        alert('Registro exitoso'); // Muestra un mensaje de éxito
        navigate('/login');  // Redirige al usuario a la página de login
      } else {
        alert(response.data.message || 'Error al registrar el usuario'); // Si hay un mensaje de error, lo mostramos
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error); // Si ocurre un error, lo imprimimos en consola
      // Muestra el mensaje de error recibido desde el backend si existe
      alert('Error al registrar el usuario: ' + error.response?.data?.message || 'Error desconocido');
    }
  };

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
          {/* Enlace para redirigir al usuario a la página de login si ya tiene cuenta */}
          <p>
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link> {/* Reemplazamos el <a> por <Link> para navegación interna */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
