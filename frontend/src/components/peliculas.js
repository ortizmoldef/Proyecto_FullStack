import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BuscadorPeliculas from './buscadorPeliculas';
import '../css/peliculas.scss'; // Importa el archivo de estilo SCSS
import api from '../axios'; // Importamos el cliente Axios configurado

const Peliculas = () => {
  // Definimos los estados para manejar las películas, los errores y los mensajes
  const [movies, setMovies] = useState([]); // Películas originales
  const [filteredMovies, setFilteredMovies] = useState([]); // Películas filtradas por búsqueda
  const [error, setError] = useState(''); // Estado para almacenar mensajes de error
  const [message, setMessage] = useState(''); // Estado para almacenar mensajes de éxito
  const token = localStorage.getItem('token'); // Recupera el token de autenticación del almacenamiento local
  const role = localStorage.getItem('role'); // Recupera el rol del usuario desde el almacenamiento local
  const navigate = useNavigate(); // Hook de react-router-dom para navegar entre rutas

  // useEffect se ejecuta cuando el componente se monta o cuando cambia el 'token'
  useEffect(() => {
    // Función asincrónica para obtener las películas desde el servidor
    const fetchMovies = async () => {
      try {
        // Hacemos una petición GET al backend para obtener las películas
        const response = await api.get(`/api/obtener_peliculas`, {
          headers: {
            Authorization: `Bearer ${token}`, // Enviamos el token en los headers para autenticar la solicitud
          },
        });

        console.log('Movies fetched:', response.data); // Muestra en consola las películas obtenidas

        // Si la petición es exitosa, actualizamos los estados 'movies' y 'filteredMovies'
        setMovies(response.data);
        setFilteredMovies(response.data);
      } catch (err) {
        console.error('Error al obtener las películas:', err); // En caso de error, se imprime en consola

        // Si el error es relacionado con el token expirado, se elimina el token y redirige al login
        if (err.response?.data?.mensaje === 'jwt expired') {
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          navigate('/login'); // Redirige a la página de login
        } else {
          // Si hay otro error, se muestra un mensaje de error genérico
          setError('No se pudieron obtener las películas.');
        }
      }
    };

    // Si el token está disponible, se llama a la función para obtener las películas
    if (token) {
      fetchMovies();
    } else {
      // Si no hay token, se muestra un mensaje de error
      setError('No hay token de autenticación.');
    }
  }, [token, navigate]); // useEffect se ejecuta cuando 'token' o 'navigate' cambian

  // Función para manejar el clic en la imagen de una película
  const handleClickImagen = (movieId) => {
    // Navega a la página con los detalles de la película seleccionada
    navigate(`/obtener_peliculas/${movieId}`);
  };

  // Función para manejar los resultados de búsqueda
  const manejarResultadosBusqueda = (resultados) => {
    // Actualiza el estado de las películas filtradas con los resultados de la búsqueda
    setFilteredMovies(resultados);
  };

  // Función para manejar cuando el campo de búsqueda está vacío
  const manejarBorrarBusqueda = () => {
    // Vuelve a mostrar todas las películas si el campo de búsqueda está vacío
    setFilteredMovies(movies);
  };

  return (
    <div className="peliculas-container">
      {/* HEADER CON ACCIONES */}
      <div className="header-actions">
        {/* Buscador de películas, que pasa funciones para manejar la búsqueda y borrar */}
        <BuscadorPeliculas 
          onResultados={manejarResultadosBusqueda}
          onBorrarBusqueda={manejarBorrarBusqueda}
        />
      </div>

      {/* Mostrar mensajes de éxito o error */}
      {message && <div className="message success">{message}</div>}
      {error && <div className="message error">{error}</div>}

      {/* LISTA DE PELÍCULAS */}
      <div className="peliculas-lista">
        {/* Si hay películas filtradas, se muestran; si no, se muestra un mensaje */}
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie._id} className="pelicula-item">
              {/* Al hacer clic en la imagen de la película, se navega a la página de detalles */}
              <img
                src={movie.poster} // Muestra la imagen del poster
                alt={movie.title}  // El alt es el título de la película
                onClick={() => handleClickImagen(movie._id)} // Acción al hacer clic
              />
            </div>
          ))
        ) : (
          <p>No se encontraron películas.</p> // Si no hay películas, muestra este mensaje
        )}
      </div>
    </div>
  );
};

export default Peliculas;
