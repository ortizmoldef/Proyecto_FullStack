import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditarPelicula = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState(5);
  const [imageBase64, setImageBase64] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Obtiene el token desde localStorage

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/obtener_peliculas/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Envía el token en la cabecera
          },
        });

        const movie = response.data;
        setTitle(movie.title);
        setDescription(movie.description);
        setGenre(Array.isArray(movie.genre) ? movie.genre.join(', ') : '');
        setYear(movie.year);
        setImageBase64(movie.poster);
        setRating(movie.rating);
        setError('');
      } catch (err) {
        console.error('❌ Error al obtener la película:', err.response?.data || err.message);
        setError('No se pudo obtener la película. Verifica la URL o tu token.');
      }
    };

    if (id && token) {
      fetchMovie(); // Si hay ID y token, llama a la función para obtener la película
    } else {
      setError('Falta el ID o el token.');
    }
  }, [id, token]); // Se ejecuta cada vez que cambian id o token

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !genre || !year) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    const movieData = {
      title,
      description,
      genre: genre.split(',').map(g => g.trim()),
      year,
      poster: imageBase64,
      rating,
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/api/modificar_pelicula/${id}`,
        movieData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('✅ Película actualizada:', response.data);
      setMessage('Película actualizada con éxito');
      setError('');
      navigate('/')
    } catch (err) {
      console.error('❌ Error al actualizar:', err.response?.data || err.message);
      setError('Error al actualizar la película.');
    }
  };

  return (
    <div>
      <h2>Editar Película</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {message && <div style={{ color: 'green' }}>{message}</div>}

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
        <div>
          <label>Calificación:</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="10"
          />
        </div>
        <div>
          <label>Imagen:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {imageBase64 && <img src={imageBase64} alt="Poster" style={{ width: '100px' }} />}
        </div>
        <button type="submit">Actualizar Película</button>
      </form>
    </div>
  );
};

export default EditarPelicula;
