const winston = require('winston');

// Crear un logger de Winston
const logger = winston.createLogger({
    level: 'info', // Nivel mínimo de logs
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }), // Log en consola
        new winston.transports.File({ filename: 'app.log' }) // Log en archivo
    ]
});

module.exports = logger;