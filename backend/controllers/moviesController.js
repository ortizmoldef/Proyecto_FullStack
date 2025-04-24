const Movie = require("../models/Movie");
const logger = require('../utils/logger');  // Importamos el logger
const mongoose = require('mongoose');

// Crear una nueva película
const createMovie = async (req, res) => {
    const isProduction = global.IS_PRODUCTION;
    const session = isProduction ? await mongoose.startSession() : null;

    try {
        if (session) session.startTransaction();

        const { title, description, genre, year, poster, rating } = req.body;

        if (!title || !description || !genre || !year) {
            logger.warn('Faltan campos obligatorios al intentar crear una película');
            if (session) await session.abortTransaction();
            return res.status(400).json({
                error: 'Los campos "title", "description", "genre", y "year" son obligatorios'
            });
        }

        const existingMovie = session
            ? await Movie.findOne({ title }).session(session)
            : await Movie.findOne({ title });

        if (existingMovie) {
            logger.warn(`La película con el título "${title}" ya existe.`);
            if (session) await session.abortTransaction();
            return res.status(409).json({
                message: 'La película ya ha sido creada con este título.'
            });
        }

        const newMovie = new Movie({ title, description, genre, year, poster, rating });

        session
            ? await newMovie.save({ session })
            : await newMovie.save();

        if (session) await session.commitTransaction();
        logger.info(`Película creada con éxito: ${title}`);
        res.status(201).json(newMovie);
    } catch (error) {
        if (session) await session.abortTransaction();
        logger.error(`❌ Error al agregar película: ${error.message}`);
        res.status(500).json({ error: 'Error interno del servidor' });
    } finally {
        if (session) session.endSession();
    }
};

// Modificar las Peliculas
const updateMovie = async (req, res) => {
    const isProduction = global.IS_PRODUCTION;
    const session = isProduction ? await mongoose.startSession() : null;
    const { id } = req.params;
    const { title, description, genre, year, poster, rating } = req.body;
  
    try {
      if (session) session.startTransaction();
  
      if (!title || !description || !genre || !year) {
        logger.warn('Faltan campos obligatorios al intentar modificar una película');
        if (session) await session.abortTransaction();
        return res.status(400).json({
          error: 'Los campos "title", "description", "genre", y "year" son obligatorios'
        });
      }
  
      const updatedMovie = session
        ? await Movie.findByIdAndUpdate(id, { title, description, genre, year, poster, rating }, { new: true, session })
        : await Movie.findByIdAndUpdate(id, { title, description, genre, year, poster, rating }, { new: true });
  
      if (!updatedMovie) {
        logger.warn(`No se encontró la película con ID: ${id}`);
        if (session) await session.abortTransaction();
        return res.status(404).json({ error: 'Película no encontrada' });
      }
  
      if (session) await session.commitTransaction();
      logger.info(`Película actualizada con éxito: ${title}`);
      res.status(200).json(updatedMovie);
    } catch (error) {
      if (session) await session.abortTransaction();
      logger.error(`❌ Error al modificar película: ${error.message}`);
      res.status(500).json({ error: 'Error interno del servidor' });
    } finally {
      if (session) session.endSession();
    }
  };

// Eliminar una película
const deleteMovie = async (req, res) => {
    const isProduction = global.IS_PRODUCTION;
    const session = isProduction ? await mongoose.startSession() : null;
    const { id } = req.params;
  
    try {
      if (session) session.startTransaction();
  
      const deletedMovie = session
        ? await Movie.findByIdAndDelete(id).session(session)
        : await Movie.findByIdAndDelete(id);
  
      if (!deletedMovie) {
        logger.warn(`No se encontró la película con ID: ${id} para eliminarla`);
        if (session) await session.abortTransaction();
        return res.status(404).json({ error: 'Película no encontrada' });
      }
  
      if (session) await session.commitTransaction();
      logger.info(`Película eliminada con éxito: ${deletedMovie.title}`);
      res.status(200).json({ message: 'Película eliminada con éxito', deletedMovie });
    } catch (error) {
      if (session) await session.abortTransaction();
      logger.error(`❌ Error al eliminar película: ${error.message}`);
      res.status(500).json({ error: 'Error interno del servidor' });
    } finally {
      if (session) session.endSession();
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
