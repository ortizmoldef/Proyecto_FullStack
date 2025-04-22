import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos el hook para redirigir a otras páginas
import '../css/insertarPelicula.scss'; // Importamos los estilos SCSS para la página de insertar película
import api from '../axios'; // Importamos el cliente Axios configurado para hacer solicitudes HTTP

const InsertarPelicula = () => {
  // Definimos los estados para manejar los valores del formulario y los mensajes de éxito y error
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState(0);
  const [imageBase64, setImageBase64] = useState(''); // Guardamos la imagen como Base64
  const [message, setMessage] = useState(''); // Mensaje de éxito
  const [error, setError] = useState(''); // Mensaje de error
  const navigate = useNavigate(); // Para navegar a otras páginas después de realizar alguna acción

  // Función para manejar la carga de la imagen
  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const maxSize = 5 * 1024 * 1024; // Tamaño máximo de la imagen: 5MB
      const reader = new FileReader();

      // Al terminar de leer el archivo, convertirlo a Base64
      reader.onloadend = () => {
        const base64String = reader.result;

        // Verificamos si la imagen excede el tamaño permitido
        if (base64String.length > maxSize * 1.33) {
          setError('La imagen es demasiado grande. El tamaño máximo permitido es 5MB.');
          setImageBase64(''); // Restablecemos la imagen
          return;
        }

        // Si la imagen es válida, la guardamos en el estado
        setImageBase64(base64String);
        setError(''); // Restablecemos el mensaje de error
      };

      reader.readAsDataURL(file); // Leemos el archivo como Base64
    }
  };

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenimos la recarga de la página al enviar el formulario

    // Verificamos si todos los campos requeridos están completos
    if (!title || !description || !genre || !year) {
      setError('Por favor, complete todos los campos.');
      setMessage(''); // Restablecemos el mensaje de éxito
      return;
    }

    // Si hay un error, no enviamos el formulario
    if (error) {
      setMessage(''); // Restablecemos el mensaje de éxito
      return;
    }

    // Preparamos los datos de la nueva película para enviarlos al backend
    const newMovie = {
      title,
      description,
      genre,
      year,
      rating,
      poster: imageBase64, // Añadimos la imagen en formato Base64
    };

    try {
      // Recuperamos el token de autenticación desde el almacenamiento local
      const token = localStorage.getItem('token');

      // Enviamos una solicitud POST al backend para crear una nueva película
      const response = await api.post('/api/crear_peliculas', newMovie, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Añadimos el token de autenticación
        }
      });

      // Si la película se crea con éxito, mostramos un mensaje de éxito
      setMessage('Película creada con éxito');
      setError(''); // Restablecemos el mensaje de error

      // Restablecemos los valores de los campos del formulario
      setTitle('');
      setDescription('');
      setGenre('');
      setYear('');
      setRating(0);
      setImageBase64('');

      // Redirigimos a la página principal
      navigate('/');
    } catch (error) {
      // Si ocurre un error, mostramos un mensaje adecuado
      if (error.response && error.response.status === 413) {
        setError(error.response.data.message || 'La imagen o datos son demasiado grandes.');
      } else {
        setError(error.response?.data?.message || 'Error al crear la película');
      }
      setMessage(''); // Restablecemos el mensaje de éxito
    }
  };

  return (
    <div className="insertar-pelicula">
      <h2>Insertar Película</h2>

      {/* Mostramos los mensajes de error y éxito si existen */}
      <div className="error-message">{error && <div>{error}</div>}</div>
      <div className="success-message">{message && <div>{message}</div>}</div>

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
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            min="1"
            max="10"
          />
        </div>
        <div>
          <label>Imagen: </label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {/* Si se ha cargado una imagen, la mostramos como miniatura */}
          {imageBase64 && (
            <img src={imageBase64} alt="Imagen del poster" style={{ width: '100px' }} />
          )}
        </div>
        {/* Botón para enviar el formulario */}
        <button type="submit">Crear Película</button>
      </form>
    </div>
  );
};

export default InsertarPelicula;
