import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BuscadorPeliculas from './buscadorPeliculas';
import '../css/peliculas.scss'; // Importa el archivo de estilo SCSS
import useApiUrl from '../hook/useAPiUrl'; // Asegúrate de importar correctamente el hook

const Peliculas = () => {
  const [movies, setMovies] = useState([]); // Películas originales
  const [filteredMovies, setFilteredMovies] = useState([]); // Películas filtradas por búsqueda
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false); // Estado para saber si estamos editando
  const [editData, setEditData] = useState({ title: '', genre: '' }); // Datos para edición masiva
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();
  
  // Llamar al hook para obtener la API URL (asegurarse de que apiUrl esté definido)
  const apiUrl = useApiUrl();

  // Fetch movies from the API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/obtener_peliculas`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMovies(response.data);
        setFilteredMovies(response.data);
      } catch (err) {
        console.error('Error al obtener las películas:', err);
        if (err.response?.data?.mensaje === 'jwt expired') {
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          navigate('/login');
        } else {
          setError('No se pudieron obtener las películas.');
        }
      }
    };

    if (token) {
      fetchMovies();
    } else {
      setError('No hay token de autenticación.');
    }
  }, [token, navigate, apiUrl]); // Asegúrate de incluir apiUrl en las dependencias

  // Eliminar todas las películas
  const handleDeleteMovies = async () => {
    try {
      await Promise.all(
        filteredMovies.map((movie) =>
          axios.delete(`${apiUrl}/api/eliminar_pelicula/${movie._id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        )
      );
      setMovies([]);
      setFilteredMovies([]);
      setMessage('Todas las películas han sido eliminadas con éxito');
    } catch (err) {
      console.error('Error al eliminar las películas:', err);
      if (err.response?.data?.mensaje === 'jwt expired') {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
      } else {
        setError('No se pudieron eliminar las películas.');
      }
    }
  };

  // Editar todas las películas
  const handleEditMovies = async () => {
    try {
      const updatedMovies = filteredMovies.map((movie) => {
        return axios.put(`${apiUrl}/api/modificar_pelicula/${movie._id}`, editData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      });

      await Promise.all(updatedMovies);
      setMessage('Todas las películas han sido actualizadas.');
      setIsEditing(false); // Detener edición masiva
    } catch (err) {
      console.error('Error al editar las películas:', err);
      if (err.response?.data?.mensaje === 'jwt expired') {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
      } else {
        setError('No se pudieron actualizar las películas.');
      }
    }
  };

  const handleClickImagen = (movieId) => {
    navigate(`/obtener_peliculas/${movieId}`);
  };

  // Función para manejar los cambios en el formulario de edición masiva
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Esta es la función que se pasará a BuscadorPeliculas
  const manejarResultadosBusqueda = (resultados) => {
    setFilteredMovies(resultados); // Actualiza las películas filtradas con los resultados de la búsqueda
  };

  // Esta función se ejecuta cuando el campo de búsqueda está vacío
  const manejarBorrarBusqueda = () => {
    setFilteredMovies(movies); // Vuelve a mostrar todas las películas cuando el campo de búsqueda está vacío
  };

  return (
    <div className="peliculas-container">
      {/* HEADER CON ACCIONES */}
      <div className="header-actions">
        <BuscadorPeliculas 
          onResultados={manejarResultadosBusqueda}
          onBorrarBusqueda={manejarBorrarBusqueda}
        />
      </div>

      {/* Mensajes */}
      {message && <div className="message success">{message}</div>}
      {error && <div className="message error">{error}</div>}

      {/* LISTA DE PELÍCULAS */}
      <div className="peliculas-lista">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie._id} className="pelicula-item">
              <img
                src={movie.poster}
                alt={movie.title}
                onClick={() => handleClickImagen(movie._id)}
              />
            </div>
          ))
        ) : (
          <p>No se encontraron películas.</p>
        )}
      </div>
    </div>
  );
};

export default Peliculas;
