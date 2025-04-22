import React from 'react';
import '../styles/editarPelicula.scss';
import useEditarPelicula from '../hook/useEditarPelicula';

const EditarPelicula = () => {
  const {
    movie,
    title, setTitle,
    genre, setGenre,
    description, setDescription,
    year, setYear,
    poster,
    rating, setRating,
    error,
    handleImageChange,
    handleSaveChanges,
  } = useEditarPelicula();

  return (
    <div className="editar-pelicula-container">
      {error && <div className="message error">{error}</div>}
      {movie && (
        <div>
          <h2>Editar Película: {movie.title}</h2>
          <label>
            Título:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            Género:
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </label>
          <label>
            Descripción:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            Año:
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </label>
          <label>
            Poster:
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
          {poster && (
            <div>
              <p>Vista previa del póster:</p>
              <img
                src={poster}
                alt="Poster preview"
                style={{ width: '200px', borderRadius: '8px' }}
              />
            </div>
          )}
          <label>
            Rating:
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </label>
          <button onClick={handleSaveChanges}>Guardar Cambios</button>
        </div>
      )}
    </div>
  );
};

export default EditarPelicula;
