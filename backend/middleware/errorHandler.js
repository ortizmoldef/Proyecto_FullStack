const logger = require('../utils/logger');  // Importamos el logger de Winston

const errorHandler = (err, req, res, next) => {
    // Registrar el error con el stack trace usando Winston
    logger.error(`Error ocurrido en la ruta ${req.originalUrl}: ${err.stack}`);

    if (err.status === 404) {
        // Manejo de recursos no encontrados
        return res.status(404).json({ error: 'Recurso no encontrado' });
    }

    // Si el error no es un 404, es un error interno del servidor
    res.status(500).json({ error: 'Error interno del servidor. Intente más tarde.' });
};

module.exports = errorHandler;
