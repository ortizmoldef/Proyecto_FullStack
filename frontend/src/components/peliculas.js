import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Importamos axios
import InsertarPelicula from './insertarPelicula'; // Importar el componente de insertar/editar película

const Peliculas = () => {
  const [movies, setMovies] = useState([]); // Lista de películas
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null); // Estado para manejar la película seleccionada para editar

  // Obtener el token y el rol almacenado en localStorage (o cualquier otro almacenamiento que estés usando)
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); // Asegúrate de que guardas el rol del usuario en el localStorage también

  // Realizar la solicitud para obtener las películas desde la base de datos
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/obtener_peliculas', {
          headers: {
            Authorization: `Bearer ${token}`,  // Incluir el token en los headers
          },
        });
        setMovies(response.data);  // Asignamos las películas obtenidas al estado `movies`
      } catch (err) {
        console.error('Error al obtener las películas:', err);
        setError('No se pudieron obtener las películas.');
      }
    };

    if (token) {
      fetchMovies();  // Llamamos a la función para obtener las películas solo si hay un token disponible
    } else {
      setError('No hay token de autenticación.');
    }
  }, [token]);  // Este efecto se ejecuta cuando el token cambia o cuando el componente se monta

  // Función para manejar la selección de la película para editar
  const handleEditMovie = (movie) => {
    setSelectedMovie(movie); // Setea la película seleccionada para editar
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
            {/* Solo muestra el botón de editar si el usuario es admin */}
            {role === 'admin' && (
              <button onClick={() => handleEditMovie(movie)}>Editar</button>
            )}
          </li>
        ))}
      </ul>

      {/* Si hay una película seleccionada, mostramos el formulario de edición */}
      {selectedMovie && (
        <InsertarPelicula 
          selectedMovie={selectedMovie} 
          setMessage={setMessage}
          setError={setError}
          setMovies={setMovies}
          setSelectedMovie={setSelectedMovie} // Pasamos la función para deselectear la película después de editar
        />
      )}
    </div>
  );
};

export default Peliculas;
