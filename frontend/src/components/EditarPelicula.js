import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/editarPelicula.scss'; // Importamos el archivo SASS para los estilos
import api from '../axios'; // Importamos el cliente Axios configurado

const EditarPelicula = () => {
  const [movie, setMovie] = useState(null);  // Estado para almacenar los datos de la película
  const [title, setTitle] = useState('');  // Estado para el título
  const [genre, setGenre] = useState('');  // Estado para el género
  const [description, setDescription] = useState('');  // Estado para la descripción
  const [year, setYear] = useState('');  // Estado para el año
  const [poster, setPoster] = useState('');  // Estado para el póster de la película (base64)
  const [rating, setRating] = useState('');  // Estado para la calificación
  const [error, setError] = useState('');  // Estado para manejar los errores
  const { id } = useParams();  // Obtenemos el ID de la película desde la URL
  const token = localStorage.getItem('token');  // Obtenemos el token de autenticación
  const navigate = useNavigate();  // Usamos navigate para redirigir a otra ruta

  // useEffect para obtener los detalles de la película cuando el componente se monta
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await api.get(`/api/obtener_peliculas/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,  // Autorizamos la solicitud con el token
          },
        });
        setMovie(response.data);  // Establecemos los datos de la película
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
      fetchMovie();  // Llamamos a la función si el ID está disponible
    }
  }, [id, token]);  // Dependencias: se ejecuta cuando cambia 'id' o 'token'

  // Función para guardar los cambios en la película
  const handleSaveChanges = async () => {
    try {
      const updatedMovie = { title, description, genre, year, poster, rating };
      console.log("Datos a actualizar:", updatedMovie);
      // Enviamos los datos actualizados a la API
      await api.put(`/api/modificar_pelicula/${id}`, updatedMovie, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/modificar_pelicula');  // Redirigimos a la lista de películas después de guardar
    } catch (err) {
      console.error('Error al actualizar la película:', err);
      setError('No se pudo actualizar la película.');
    }
  };

  return (
    <div className="editar-pelicula-container">
      {error && <div className="message error">{error}</div>}  {/* Si hay error, lo mostramos */}
      {movie && (
        <div>
          <h2>Editar Película: {movie.title}</h2>
          <label>
            Título:
            <input
              type="text"
              value={title || ''}
              onChange={(e) => setTitle(e.target.value)}  // Actualiza el título
            />
          </label>
          <label>
            Género:
            <input
              type="text"
              value={genre || ''}
              onChange={(e) => setGenre(e.target.value)}  // Actualiza el género
            />
          </label>
          <label>
            Descripción:
            <textarea
              value={description || ''}
              onChange={(e) => setDescription(e.target.value)}  // Actualiza la descripción
            />
          </label>
          <label>
            Año:
            <input
              type="number"
              value={year || ''}
              onChange={(e) => setYear(e.target.value)}  // Actualiza el año
            />
          </label>
          <label>
            Poster:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];  // Obtiene el archivo de imagen
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setPoster(reader.result);  // Convierte la imagen a base64
                  };
                  reader.readAsDataURL(file);  // Lee el archivo como Data URL (base64)
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
              onChange={(e) => setRating(e.target.value)}  // Actualiza la calificación
            />
          </label>
          <button onClick={handleSaveChanges}>Guardar Cambios</button>  {/* Botón para guardar los cambios */}
        </div>
      )}
    </div>
  );
};

export default EditarPelicula;
