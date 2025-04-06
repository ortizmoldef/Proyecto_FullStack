import React, { useState, useEffect } from 'react';

const InsertarPelicula = ({ selectedMovie, setMessage, setError, setMovies, setSelectedMovie }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');

  // Si se está editando una película, se llenan los campos con los valores de la película seleccionada
  useEffect(() => {
    if (selectedMovie) {
      setTitle(selectedMovie.title);
      setDescription(selectedMovie.description);
      setGenre(selectedMovie.genre);
      setYear(selectedMovie.year);
    }
  }, [selectedMovie]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !genre || !year) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    if (selectedMovie) {
      // Lógica para actualizar la película
      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie._id === selectedMovie._id
            ? { ...movie, title, description, genre, year } // Actualizamos los datos de la película
            : movie
        )
      );
      setMessage('Película actualizada con éxito');
    } else {
      // Lógica para crear una nueva película
      const newMovie = {
        _id: Math.random().toString(), // Generamos un ID único (esto debería ser manejado por el backend)
        title,
        description,
        genre,
        year,
      };
      setMovies((prevMovies) => [...prevMovies, newMovie]);
      setMessage('Película creada con éxito');
    }

    // Limpiar los campos después de guardar
    setTitle('');
    setDescription('');
    setGenre('');
    setYear('');

    // Deseleccionamos la película después de la edición
    setSelectedMovie(null);
  };

  return (
    <div>
      <h2>{selectedMovie ? 'Editar' : 'Insertar'} Película</h2>
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
        <button type="submit">{selectedMovie ? 'Actualizar' : 'Crear'} Película</button>
      </form>
    </div>
  );
};

export default InsertarPelicula;
