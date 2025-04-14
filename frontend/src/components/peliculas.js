import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BuscadorPeliculas from './buscadorPeliculas';

const Peliculas = () => {
  const [movies, setMovies] = useState([]); // Películas originales
  const [filteredMovies, setFilteredMovies] = useState([]); // Películas filtradas por búsqueda
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  // Fetch movies from the API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/obtener_peliculas', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMovies(response.data); // Guardamos todas las películas
        setFilteredMovies(response.data); // Inicializamos las películas filtradas con todas las películas
      } catch (err) {
        console.error('Error al obtener las películas:', err);
        setError('No se pudieron obtener las películas.');
      }
    };

    if (token) {
      fetchMovies();
    } else {
      setError('No hay token de autenticación.');
    }
  }, [token]);

  const handleEditMovie = (movieId) => {
    navigate(`/modificar_pelicula/${movieId}`);
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      await axios.delete(`http://localhost:5000/api/eliminar_pelicula/${movieId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMovies(movies.filter((movie) => movie._id !== movieId)); // Elimina de la lista original
      setFilteredMovies(filteredMovies.filter((movie) => movie._id !== movieId)); // Elimina de la lista filtrada
      setMessage('Película eliminada con éxito');
    } catch (err) {
      console.error('Error al eliminar la película:', err);
      setError('No se pudo eliminar la película.');
    }
  };

  const handleClickImagen = (movieId) => {
    navigate(`/obtener_peliculas/${movieId}`);
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
    <div>
      {/* Pasamos la función manejarResultadosBusqueda y manejarBorrarBusqueda como props */}
      <BuscadorPeliculas 
        onResultados={manejarResultadosBusqueda}
        onBorrarBusqueda={manejarBorrarBusqueda}
      />
      
      {message && <div style={{ color: 'green' }}>{message}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <h3>Lista de Películas</h3>
      <ul>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <li key={movie._id}>
              <img
                src={movie.poster}
                alt={movie.title}
                style={{ width: '100px', cursor: 'pointer' }}
                onClick={() => handleClickImagen(movie._id)}
              />
              {role === 'admin' && (
                <>
                  <button onClick={() => handleEditMovie(movie._id)}>Editar</button>
                  <button onClick={() => handleDeleteMovie(movie._id)}>Eliminar</button>
                </>
              )}
            </li>
          ))
        ) : (
          <p>No se encontraron películas.</p>
        )}
      </ul>
    </div>
  );
};

export default Peliculas;
