import React from 'react';
import useInsertarPelicula from '../hook/useInsertarPelicula'; 
import '../styles/insertarPelicula.scss';

const InsertarPelicula = () => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    genre,
    setGenre,
    year,
    setYear,
    rating,
    setRating,
    imageBase64,
    message,
    error,
    handleImageUpload,
    handleSubmit,
  } = useInsertarPelicula(); // Usamos el hook

  return (
    <div className="insertar-pelicula">
      <h2>Insertar Película</h2>

      {/* Mensajes de error y éxito */}
      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}

      {/* Formulario para insertar una nueva película */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título: </label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Descripción: </label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Género: </label>
          <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
        </div>
        <div>
          <label>Año: </label>
          <input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
        </div>
        <div>
          <label>Calificación: </label>
          <input type="number" value={rating} onChange={(e) => setRating(Number(e.target.value))} min="1" max="10" />
        </div>
        <div>
          <label>Imagen: </label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {imageBase64 && (
            <img src={imageBase64} alt="Imagen del poster" style={{ width: '100px' }} />
          )}
        </div>
        <button type="submit">Crear Película</button>
      </form>
    </div>
  );
};

export default InsertarPelicula;
