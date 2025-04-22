const Movie = require("../models/Movie");
const logger = require('../utils/logger');  // Importamos el logger

// Crear una nueva película
const createMovie = async (req, res) => {
    try {
        const { title, description, genre, year, poster, rating } = req.body;

        // Verificar que todos los campos obligatorios están presentes
        if (!title || !description || !genre || !year) {
            logger.warn('Faltan campos obligatorios al intentar crear una película');
            return res.status(400).json({ error: 'Los campos "title", "description", "genre", y "year" son obligatorios' });
        }

        // Verificar si la película ya existe en la base de datos
        const existingMovie = await Movie.findOne({ title: title });
        if (existingMovie) {
            logger.warn(`La película con el título "${title}" ya existe en la base de datos.`);
            return res.status(409).json({ message: 'La película ya ha sido creada con este título.' });
        }

        // Crear nueva película
        const newMovie = new Movie({ title, description, genre, year, poster, rating });
        await newMovie.save(); // Guardar en la base de datos

        logger.info(`Película creada con éxito: ${title}`);
        // Responder con la película creada
        res.status(201).json(newMovie);
    } catch (error) {
        logger.error(`❌ Error al agregar película: ${error.message}`);
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
            logger.warn('Faltan campos obligatorios al intentar modificar una película');
            return res.status(400).json({ error: 'Los campos "title", "description", "genre", y "year" son obligatorios' });
        }

        // Buscar y actualizar la película por ID
        const updatedMovie = await Movie.findByIdAndUpdate(id, { title, description, genre, year, poster, rating }, { new: true });

        // Verificar si la película fue encontrada
        if (!updatedMovie) {
            logger.warn(`No se encontró la película con ID: ${id}`);
            return res.status(404).json({ error: 'Película no encontrada' });
        }

        logger.info(`Película actualizada con éxito: ${title}`);
        // Responder con la película actualizada
        res.status(200).json(updatedMovie);
    } catch (error) {
        logger.error(`❌ Error al modificar película: ${error.message}`);
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
            logger.warn(`No se encontró la película con ID: ${id} para eliminarla`);
            return res.status(404).json({ error: 'Película no encontrada' });
        }

        logger.info(`Película eliminada con éxito: ${deletedMovie.title}`);
        // Responder con la película eliminada
        res.status(200).json({ message: 'Película eliminada con éxito', deletedMovie });
    } catch (error) {
        logger.error(`❌ Error al eliminar película: ${error.message}`);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener todas las películas
const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();  // Encuentra todas las películas en la base de datos
        logger.info(`Se han obtenido ${movies.length} películas`);
        res.status(200).json(movies);  // Devuelve las películas en formato JSON
    } catch (error) {
        logger.error(`❌ Error al obtener las películas: ${error.message}`);
        res.status(500).json({ error: 'Error al obtener las películas' });
    }
};

// Obtener una película por ID
const getMovieById = async (req, res) => {
    const { id } = req.params;
    
    try {
      const movie = await Movie.findById(id);
      
      if (!movie) {
        logger.warn(`No se encontró la película con ID: ${id}`);
        return res.status(404).json({ error: 'Película no encontrada' });
      }
      
      logger.info(`Película encontrada con éxito: ${movie.title}`);
      res.status(200).json(movie);
    } catch (err) {
      logger.error(`❌ Error al obtener la película: ${err.message}`);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Buscar película por título
const searchMovie = async (req, res) => {
    const { query } = req.query;

  try {
    if (!query) {
      logger.warn('Falta el parámetro de búsqueda');
      return res.status(400).json({ error: 'Falta el parámetro de búsqueda' });
    }

    const peliculas = await Movie.find({
      title: { $regex: query, $options: 'i' }  // Búsqueda insensible a mayúsculas
    });

    logger.info(`Se han encontrado ${peliculas.length} películas con el término de búsqueda: "${query}"`);
    res.json(peliculas);
  } catch (error) {
    logger.error(`❌ Error en búsqueda de películas: ${error.message}`);
    res.status(500).json({ error: 'Error al buscar películas' });
  }
}

module.exports = {
    createMovie,
    updateMovie,
    deleteMovie,
    getAllMovies,
    getMovieById,
    searchMovie
};
