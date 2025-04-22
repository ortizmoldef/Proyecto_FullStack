import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById, updateMovie } from '../services/movieService'; // Importamos el servicio

const useEditarPelicula = () => {
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

  // Cargar la película al inicio
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieById(id, token); // Usamos el servicio
        setMovie(data);
        setTitle(data.title);
        setGenre(data.genre);
        setDescription(data.description);
        setYear(data.year);
        setPoster(data.poster);
        setRating(data.rating);
      } catch (err) {
        setError('No se pudo obtener la película para editar.');
      }
    };

    if (id) fetchMovie();
  }, [id, token]);

  // Manejo de cambio de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPoster(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Guardar cambios en la película
  const handleSaveChanges = async () => {
    try {
      const updatedMovie = { title, description, genre, year, poster, rating };
      await updateMovie(id, updatedMovie, token); // Usamos el servicio
      navigate('/modificar_pelicula');
    } catch (err) {
      setError('No se pudo actualizar la película.');
    }
  };

  return {
    movie,
    title,
    setTitle,
    genre,
    setGenre,
    description,
    setDescription,
    year,
    setYear,
    poster,
    setPoster,
    rating,
    setRating,
    error,
    handleImageChange,
    handleSaveChanges,
  };
};

export default useEditarPelicula;
