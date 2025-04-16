import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/editarPelicula.scss'; // Importamos el archivo SASS

const EditarPelicula = () => {
  const [movie, setMovie] = useState(null);
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [poster, setPoster] = useState('');
  const [rating, setRating] = useState('');
  const [error, setError] = useState('');
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/obtener_peliculas/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMovie(response.data);
        setTitle(response.data.title);
        setGenre(response.data.genre);
        setDescription(response.data.description);
        setYear(response.data.year);
        setPoster(response.data.poster);
        setRating(response.data.rating);
      } catch (err) {
        console.error('Error al obtener la película:', err);
        setError('No se pudo obtener la película para editar.');
      }
    };

    if (id) {
      fetchMovie();
    }
  }, [id, token]);

  const handleSaveChanges = async () => {
    try {
      const updatedMovie = { title, description, genre, year, poster, rating };
      console.log("Datos a actualizar:", updatedMovie);
      await axios.put(`http://localhost:5000/api/modificar_pelicula/${id}`, updatedMovie, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/modificar_pelicula');
    } catch (err) {
      console.error('Error al actualizar la película:', err);
      setError('No se pudo actualizar la película.');
    }
  };


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
              value={title || ''}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            Género:
            <input
              type="text"
              value={genre || ''}
              onChange={(e) => setGenre(e.target.value)}
            />
          </label>
          <label>
            Descripción:
            <textarea
              value={description || ''}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            Año:
            <input
              type="number"
              value={year || ''}
              onChange={(e) => setYear(e.target.value)}
            />
          </label>
          <label>
            Poster:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setPoster(reader.result); // base64
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </label>
          {poster && (
            <div>
              <p>Vista previa del póster:</p>
              <img src={poster} alt="Poster preview" style={{ width: '200px', borderRadius: '8px' }} />
            </div>
          )}
          <label>
            Rating:
            <input
              type="number"
              value={rating || ''}
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
