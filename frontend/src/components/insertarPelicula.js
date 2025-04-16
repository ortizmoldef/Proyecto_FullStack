import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/insertarPelicula.scss';

const InsertarPelicula = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState(5);
  const [imageBase64, setImageBase64] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result;
        if (base64String.length > maxSize * 1.33) {
          setError('La imagen es demasiado grande. El tamaño máximo permitido es 5MB.');
          setImageBase64('');
          return;
        }

        setImageBase64(base64String);
        setError('');
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !genre || !year) {
      setError('Por favor, complete todos los campos.');
      setMessage('');
      return;
    }

    if (error) {
      setMessage('');
      return;
    }

    const newMovie = {
      title,
      description,
      genre,
      year,
      rating,
      poster: imageBase64,
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/crear_peliculas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newMovie),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 413) {
          setError(errorData.message);
          setMessage('');
          return;
        }
        throw new Error(errorData.message || 'Error al crear la película');
      }

      setMessage('Película creada con éxito');
      setError('');

      setTitle('');
      setDescription('');
      setGenre('');
      setYear('');
      setRating(5);
      setImageBase64('');

      navigate('/');
    } catch (error) {
      setError(error.message);
      setMessage('');
    }
  };

  return (
    <div className="insertar-pelicula">
      <h2>Insertar Película</h2>

      <div className="error-message">
        {error && <div>{error}</div>}
      </div>

      <div className="success-message">
        {message && <div>{message}</div>}
      </div>

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
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="10"
          />
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
