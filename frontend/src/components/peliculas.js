import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BuscadorPeliculas from './buscadorPeliculas'; // Componente de búsqueda separado
import useMovies from '../hook/useMovies'; 
import useDebounce from '../hook/useDebounce'; 
import '../styles/peliculas.scss';

const Peliculas = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const { movies, filteredMovies, setFilteredMovies, error } = useMovies(token);

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(movies);
    }
  }, [debouncedSearchTerm, movies, setFilteredMovies]);

  const handleClickImagen = (movieId) => {
    navigate(`/obtener_peliculas/${movieId}`);
  };

  const manejarBorrarBusqueda = () => {
    setSearchTerm('');
    setFilteredMovies(movies);
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="peliculas-container">
      <div className="header-actions">
        <BuscadorPeliculas 
          setSearchTerm={setSearchTerm}
          onBorrarBusqueda={manejarBorrarBusqueda}
        />
      </div>

      <div className="peliculas-lista">
        {filteredMovies.length === 0 && <p>No se encontraron películas.</p>}

        {filteredMovies.map(({ _id, poster, title }) => (
          <div key={_id} className="pelicula-item">
            <img
              src={poster}
              alt={title}
              onClick={() => handleClickImagen(_id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Peliculas;
