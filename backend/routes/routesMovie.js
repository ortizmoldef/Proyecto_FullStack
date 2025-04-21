const express = require('express');
const router = express.Router();
const movieController = require('../controllers/moviesController');
const authMiddleware = require('../middleware/middleware');
const allowCors = require('../middleware/allowCors'); // Asegúrate de importar el middleware de CORS

// Crear Peliculas
router.post('/crear_peliculas', allowCors(authMiddleware), allowCors(movieController.createMovie));

// Modificar las peliculas
router.put('/modificar_pelicula/:id', allowCors(authMiddleware), allowCors(movieController.updateMovie));

// Eliminar Peliculas
router.delete('/eliminar_pelicula/:id', allowCors(authMiddleware), allowCors(movieController.deleteMovie));

router.get('/obtener_peliculas', allowCors(authMiddleware), allowCors(movieController.getAllMovies));
router.get('/obtener_peliculas/:id', allowCors(authMiddleware), allowCors(movieController.getMovieById));
router.get('/buscar_peliculas', allowCors(authMiddleware), allowCors(movieController.searchMovie));

module.exports = router;
