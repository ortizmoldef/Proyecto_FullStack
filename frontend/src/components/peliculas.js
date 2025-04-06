import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Peliculas = () => {
  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

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

  const handleEditMovie = (movie) => {
    setSelectedMovie(movie);
    setTitle(movie.title);
    setDescription(movie.description);
    setGenre(movie.genre);
    setYear(movie.year);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !genre || !year) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    if (selectedMovie) {
      // Realizamos la actualización en la base de datos
      try {
        const response = await axios.put(
          `http://localhost:5000/api/modificar_pelicula/${selectedMovie._id}`, // Enviar el ID de la película a actualizar
          {
            title,
            description,
            genre,
            year,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Actualizamos la lista de películas con los nuevos datos
        setMovies((prevMovies) =>
          prevMovies.map((movie) =>
            movie._id === selectedMovie._id
              ? { ...movie, title, description, genre, year }
              : movie
          )
        );

        setMessage('Película actualizada con éxito');
        setSelectedMovie(null); // Deseleccionamos la película después de editar
      } catch (error) {
        console.error('Error al actualizar la película:', error);
        setError('No se pudo actualizar la película.');
      }
    }

    // Limpiar los campos
    setTitle('');
    setDescription('');
    setGenre('');
    setYear('');
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
            <p>{movie.genre} - {movie.year}</p>
            {role === 'admin' && (
              <button onClick={() => handleEditMovie(movie)}>Editar</button>
            )}
          </li>
        ))}
      </ul>

      {/* Formulario de edición */}
      {selectedMovie && (
        <div>
          <h3>Editar Película</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Título:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label>Descripción:</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label>Género:</label>
              <input
                type="text"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
            </div>
            <div>
              <label>Año:</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <button type="submit">Actualizar Película</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Peliculas;
