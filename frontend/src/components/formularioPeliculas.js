import React, { useState } from 'react';
import axios from 'axios';

const MovieForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description || !genre || !year) {
            setError('Todos los campos son obligatorios');
            return;
        }

        const movieData = { title, description, genre, year };

        try {
            const response = await axios.post('http://localhost:5000/api/movie_api_local', movieData);
            console.log('Película creada:', response.data);
            setTitle('');
            setDescription('');
            setGenre('');
            setYear('');
            setError('');
        } catch (err) {
            console.error('Error al crear la película:', err);
            setError('Hubo un error al crear la película');
        }
    };

    return (
        <div>
            <h2>Crear una nueva película</h2>
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
                <button type="submit">Crear Película</button>
            </form>
        </div>
    );
};

export default MovieForm;
