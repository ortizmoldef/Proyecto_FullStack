import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axios'; // Importamos el cliente Axios configurado

const useRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook para navegar entre las páginas de la aplicación

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario (recarga de la página)

    // Verificamos si todos los campos están llenos
    if (!name || !email || !password || !confirmPassword) {
      setError('Todos los campos son obligatorios'); // Muestra un mensaje de error si algún campo está vacío
      return;
    }

    // Verificamos si las contraseñas coinciden
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden'); // Si las contraseñas no coinciden, muestra un mensaje de error
      return;
    }

    try {
      // Hacemos una solicitud POST al backend para registrar al usuario
      const response = await api.post('/api/register', {
        name,
        email,
        password,
      });

      // Verificamos si la respuesta del backend es exitosa
      if (response.data && response.data.message === 'Usuario registrado con éxito.') {
        navigate('/login'); // Redirigimos al usuario a la página de login
      } else {
        setError(response.data.message || 'Error al registrar el usuario'); // Si hay un mensaje de error, lo mostramos
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error); // Si ocurre un error, lo imprimimos en consola
      setError('Error al registrar el usuario: ' + (error.response?.data?.message || 'Error desconocido'));
    }
  };

  return {
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
  };
};

export default useRegister;
