import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AuthContext'; // Importamos el contexto para la autenticación
import api from '../axios'; // Importamos el cliente Axios configurado

const useLogin = () => {
  const { login } = useAppContext(); // Accedemos al contexto de autenticación para usar la función 'login'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate(); // Hook para navegar entre las páginas de la aplicación

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

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSubmit,
  };
};

export default useLogin;
