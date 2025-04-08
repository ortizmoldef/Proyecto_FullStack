const Movie = require("../models/Movie");

// Crear una nueva película
const createMovie = async (req, res) => {
    try {
        const { title, description, genre, year, poster, rating } = req.body;

        // Verificar que todos los campos obligatorios están presentes
        if (!title || !description || !genre || !year) {
            return res.status(400).json({ error: 'Los campos "title", "description", "genre", y "year" son obligatorios' });
        }

        // Verificar si la película ya existe en la base de datos
        const existingMovie = await Movie.findOne({ title: title });
        if (existingMovie) {
            return res.status(409).json({ message: 'La película ya ha sido creada con este título.' });
        }

        // Crear nueva película
        const newMovie = new Movie({ title, description, genre, year, poster, rating });
        await newMovie.save(); // Guardar en la base de datos

        // Responder con la película creada
        res.status(201).json(newMovie);
    } catch (error) {
        console.error('❌ Error al agregar película:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Modificar las Peliculas
const updateMovie = async (req, res) => {
    const { id } = req.params;  // Obtener ID de la película desde la URL
    const { title, description, genre, year, poster, rating } = req.body;

    try {
        // Validar que los campos obligatorios estén presentes
        if (!title || !description || !genre || !year) {
            return res.status(400).json({ error: 'Los campos "title", "description", "genre", y "year" son obligatorios' });
        }

        // Buscar y actualizar la película por ID
        const updatedMovie = await Movie.findByIdAndUpdate(id, { title, description, genre, year, poster, rating }, { new: true });

        // Verificar si la película fue encontrada
        if (!updatedMovie) {
            return res.status(404).json({ error: 'Película no encontrada' });
        }

        // Responder con la película actualizada
        res.status(200).json(updatedMovie);
    } catch (error) {
        console.error('❌ Error al modificar película:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Eliminar una película
const deleteMovie = async (req, res) => {
    const { id } = req.params;  // Obtener el ID desde la URL

    try {
        // Intentar eliminar la película por ID
        const deletedMovie = await Movie.findByIdAndDelete(id);

        // Si no se encuentra la película, responder con un error
        if (!deletedMovie) {
            return res.status(404).json({ error: 'Película no encontrada' });
        }

        // Responder con la película eliminada
        res.status(200).json({ message: 'Película eliminada con éxito', deletedMovie });
    } catch (error) {
        console.error('❌ Error al eliminar película:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener todas las películas
const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();  // Encuentra todas las películas en la base de datos
        res.status(200).json(movies);  // Devuelve las películas en formato JSON
    } catch (error) {
        console.error('❌ Error al obtener las películas:', error);
        res.status(500).json({ error: 'Error al obtener las películas' });
    }
};

const getMovieById = async (req, res) => {
    const { id } = req.params;
    
    try {
      const movie = await Movie.findById(id);
      
      if (!movie) {
        return res.status(404).json({ error: 'Película no encontrada' });
      }
      
      res.status(200).json(movie);
    } catch (err) {
      console.error('Error al obtener la película:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

module.exports = {
    createMovie,
    updateMovie,
    deleteMovie,
    getAllMovies,
    getMovieById
};
