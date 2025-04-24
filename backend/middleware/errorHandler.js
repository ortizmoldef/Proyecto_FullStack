// Importamos el logger personalizado basado en Winston
const logger = require('../utils/logger');  // Importamos el logger de Winston

// Middleware para manejar errores globalmente en la app
const errorHandler = (err, req, res, next) => {
    // Usamos Winston para registrar el error completo, incluyendo el stack trace
    logger.error(`Error ocurrido en la ruta ${req.originalUrl}: ${err.stack}`);

    // Si el error tiene código de estado 404, respondemos con "Recurso no encontrado"
    if (err.status === 404) {
        return res.status(404).json({ error: 'Recurso no encontrado' });
    }

    // Para cualquier otro tipo de error, devolvemos un error 500 (Error interno del servidor)
    res.status(500).json({ error: 'Error interno del servidor. Intente más tarde.' });
};

// Exportamos el middleware para poder usarlo en la configuración de Express
module.exports = errorHandler;
