import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BuscadorPeliculas from './buscadorPeliculas';
import '../css/peliculas.scss'; // Importa el archivo de estilo SCSS
import api from '../axios'; // Importamos el cliente Axios configurado

const Peliculas = () => {
  const [movies, setMovies] = useState([]); // Películas originales
  const [filteredMovies, setFilteredMovies] = useState([]); // Películas filtradas por búsqueda
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();
  


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get(`/api/obtener_peliculas`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Movies fetched:', response.data);
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
  }, [token, navigate,]);

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
