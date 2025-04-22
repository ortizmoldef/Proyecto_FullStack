import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axios'; // Importamos el cliente Axios configurado

const useAdminPeliculas = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');  // Token de autenticación
  const navigate = useNavigate();  // Hook para navegación

  // useEffect para obtener las películas al cargar el componente
  useEffect(() => {
    const obtenerPeliculas = async () => {
      try {
        const response = await api.get('/api/obtener_peliculas', {
          headers: {
            Authorization: `Bearer ${token}`,  // Enviar el token en las cabeceras
          },
        });
        setPeliculas(response.data);  // Almacenamos las películas en el estado
      } catch (error) {
        console.error('❌ Error al obtener películas:', error);
        setError('No se pudieron cargar las películas');
      } finally {
        setLoading(false);  // Dejamos de mostrar el indicador de carga
      }
    };

    obtenerPeliculas();  // Llamamos a la función para obtener las películas
  }, [token]);  // Se ejecuta cada vez que cambia el token

  // Función para manejar la edición de una película
  const handleEditar = (id) => {
    navigate(`/modificar_pelicula/${id}`);  // Redirige a la página de edición de la película
  };

  // Función para manejar la eliminación de una película
  const handleEliminar = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta película?')) {
      eliminarPelicula(id);  // Llamamos a la función para eliminar la película
    }
  };

  // Función para eliminar la película en la API
  const eliminarPelicula = async (id) => {
    try {
      await api.delete(`/api/eliminar_pelicula/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,  // Enviar el token en las cabeceras
        },
      });
      setPeliculas(peliculas.filter((pelicula) => pelicula._id !== id));  // Actualizamos la lista de películas
    } catch (error) {
      console.error('❌ Error al eliminar la película:', error);
      setError('No se pudo eliminar la película');
    }
  };

  return {
    peliculas,
    error,
    loading,
    handleEditar,
    handleEliminar,
  };
};

export default useAdminPeliculas;
