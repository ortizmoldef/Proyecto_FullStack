import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Peliculas = () => {
    const [movies, setMovies] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    // Obtener todas las películas al cargar el componente
    useEffect(() => {
        fetchMovies();
    }, []);

    // Función para obtener las películas
    const fetchMovies = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/obtener_peliculas');
            setMovies(response.data);
        } catch (err) {
            console.error('Error al obtener las películas', err);
        }
    };

    // Función para crear o actualizar una película
const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !genre || !year) {
        setError('Todos los campos son obligatorios');
        return;
    }

    const movieData = { title, description, genre, year };

    try {
        if (selectedMovie) {
            // Si estamos actualizando, enviamos un PUT
            await axios.put(`http://localhost:5000/api/modificar_pelicula/${selectedMovie._id}`, movieData);
            setMessage('Película actualizada con éxito');
        } else {
            // Si estamos creando una película, enviamos un POST
            await axios.post('http://localhost:5000/api/crear_peliculas', movieData);
            setMessage('Película creada con éxito');
        }
        // Limpiar el formulario y volver a cargar las películas
        setTitle('');
        setDescription('');
        setGenre('');
        setYear('');
        setSelectedMovie(null);
        fetchMovies();
        setError('');
    } catch (err) {
        console.error('Error al crear o actualizar la película', err);
        setError('Hubo un error al procesar la película');
    }
};

    // Función para eliminar una película
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/eliminar_pelicula/${id}`);
            setMessage('Película eliminada con éxito');
            fetchMovies();
        } catch (err) {
            console.error('Error al eliminar la película', err);
            setError('Hubo un error al eliminar la película');
        }
    };

    // Función para seleccionar una película y cargarla en el formulario de edición
    const handleEdit = (movie) => {
        setSelectedMovie(movie);
        setTitle(movie.title);
        setDescription(movie.description);
        setGenre(movie.genre);
        setYear(movie.year);
    };

    return (
        <div>
            <h2>{selectedMovie ? 'Editar' : 'Crear'} Película</h2>
            {message && <div style={{ color: 'green' }}>{message}</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
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

            <h3>Lista de Películas</h3>
            <ul>
                {movies.map((movie) => (
                    <li key={movie._id}>
                        <p><strong>{movie.title}</strong></p>
                        <p>{movie.description}</p>
                        <p>{movie.genre} - {movie.year}</p>
                        <button onClick={() => handleEdit(movie)}>Editar</button>
                        <button onClick={() => handleDelete(movie._id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Peliculas;
