import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InsertarPelicula = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState(5);
  const [imageBase64, setImageBase64] = useState('');
  const [message, setMessage] = useState(''); // Estado para el mensaje de éxito
  const [error, setError] = useState(''); // Estado para el mensaje de error
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
  
    if (file) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      const reader = new FileReader();
  
      reader.onloadend = () => {
        const base64String = reader.result;
        // Verificar el tamaño de la cadena Base64 (aproximadamente 33% más grande que el archivo binario original)
        if (base64String.length > maxSize * 1.33) {
          setError('La imagen es demasiado grande. El tamaño máximo permitido es 5MB.');
          setImageBase64('');  // Limpiar la imagen cargada
          return;
        }
  
        setImageBase64(base64String);
        setError('');  // Limpiar cualquier error si la imagen es válida
      };
  
      reader.readAsDataURL(file); // Convierte el archivo a Base64
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!title || !description || !genre || !year) {
      setError('Por favor, complete todos los campos.');
      setMessage('');  // Limpiar el mensaje de éxito si hay un error
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
      poster: imageBase64
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
          setError(errorData.message); // Error específico cuando la imagen es demasiado grande
          setMessage('');
          return;
        }
        throw new Error(errorData.message || 'Error al crear la película');
      }
  
      setMessage('Película creada con éxito');
      setError('');
  
      // Limpiar campos
      setTitle('');
      setDescription('');
      setGenre('');
      setYear('');
      setRating(5);
      setImageBase64(''); // Limpiar la imagen cargada
  
      // Redirigir al home
      navigate('/');
    } catch (error) {
      setError(error.message); // Mostrar error en caso de fallo
      setMessage('');
    }
  };
  

  return (
    <div>
      <h2>Insertar Película</h2>
      {/* Mostrar el mensaje de error si existe */}
      <div className="error-message" style={{ color: 'red' }}>
        {error && <div>{error}</div>}
      </div>

      {/* Mostrar el mensaje de éxito si existe */}
      <div className="success-message" style={{ color: 'green' }}>
        {message && <div>{message}</div>}
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Descripción:</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Género:</label>
          <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
        </div>
        <div>
          <label>Año:</label>
          <input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
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
          {imageBase64 && <img src={imageBase64} alt="Imagen del poster" style={{ width: '100px' }} />}
        </div>
        <button type="submit">Crear Película</button>
      </form>
    </div>
  );
};

export default InsertarPelicula;
