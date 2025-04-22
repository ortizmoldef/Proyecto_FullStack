// src/hooks/useMovies.js
import { useState, useEffect } from 'react';
import { getMovies, searchMovies } from '../services/movieService'; // Importamos las funciones del service

const useMovies = (token) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setError('No hay token de autenticación.');
      setLoading(false);
      return;
    }

    const fetchMovies = async () => {
      try {
        setLoading(true);
        const movieData = await getMovies(token); // Usamos el servicio para obtener las películas
        setMovies(movieData);
        setFilteredMovies(movieData);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message); // Usamos el mensaje de error del servicio
      }
    };

    fetchMovies();
  }, [token]);

  // Función para realizar una búsqueda (opcional)
  const searchMoviesHandler = async (searchTerm) => {
    try {
      const filtered = await searchMovies(token, searchTerm); // Usamos el servicio de búsqueda
      setFilteredMovies(filtered);
    } catch (err) {
      setError(err.message);
    }
  };

  return { movies, filteredMovies, setFilteredMovies, error, loading, searchMoviesHandler };
};

export default useMovies;
