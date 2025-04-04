const express = require('express');
const router = express.Router();
const movieController = require('../controllers/moviesController');
const authMiddleware = require('../middleware/middleware');

// Crear Peliculas
router.post('/crear_peliculas', authMiddleware, movieController.createMovie);

// Modificar las peliculas
router.put('/modificar_pelicula/:id', authMiddleware , movieController.updateMovie);

// Eliminar Peliculas
router.delete('/eliminar_pelicula/:id', authMiddleware , movieController.deleteMovie);

router.get('/obtener_peliculas', authMiddleware, movieController.getAllMovies)

module.exports = router;
