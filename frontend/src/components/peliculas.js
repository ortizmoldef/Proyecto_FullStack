import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Peliculas = () => {
  const [movies, setMovies] = useState([]);
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
        setMovies(response.data);
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
    navigate(`/editar-pelicula/${movieId}`);  // Redirigir al componente de edición
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/eliminar_pelicula/${movieId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMovies(movies.filter((movie) => movie._id !== movieId));
      setMessage('Película eliminada con éxito');
    } catch (err) {
      console.error('Error al eliminar la película:', err);
      setError('No se pudo eliminar la película.');
    }
  };

  return (
    <div>
      {message && <div style={{ color: 'green' }}>{message}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <h3>Lista de Películas</h3>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            <p><strong>{movie.title}</strong></p>
            <p>{movie.description}</p>
            <p>{movie.genre.join(', ')} - {movie.year}</p>
            <img src={movie.poster} alt={movie.title} style={{ width: '100px' }} />
            {role === 'admin' && (
              <>
                <button onClick={() => handleEditMovie(movie._id)}>Editar</button>
                <button onClick={() => handleDeleteMovie(movie._id)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Peliculas;
