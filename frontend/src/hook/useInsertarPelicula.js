import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { createMovie } from '../services/movieService'; // Importamos el servicio

const useInsertarPelicula = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState(0);
  const [imageBase64, setImageBase64] = useState('');  
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024; // Max size: 5MB
      const reader = new FileReader();

      if (!file.type.startsWith('image/')) {
        setError('Por favor, selecciona un archivo de imagen válido.');
        setImageBase64('');
        return;
      }

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

    if (rating < 1 || rating > 10) {
      setError('La calificación debe estar entre 1 y 10.');
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
      poster: imageBase64,  // La imagen base64 se pasa aquí
    };

    try {
      const token = localStorage.getItem('token');
      await createMovie(newMovie, token); // Usamos el servicio para crear la película

      setMessage('Película creada con éxito');
      setError('');
      setTitle('');
      setDescription('');
      setGenre('');
      setYear('');
      setRating(0);
      setImageBase64('');  // Limpia la imagen después de la creación

      navigate('/'); // Redirigir al inicio después de insertar la película
    } catch (error) {
      setError(error.message); // Mostrar el error que proviene del servicio
      setMessage('');
    }
  };

  return {
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
  };
};

export default useInsertarPelicula;
