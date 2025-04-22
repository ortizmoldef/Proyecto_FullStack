import winston from 'winston';

// Configuración del logger
const logger = winston.createLogger({
  level: 'info', // Puedes cambiar el nivel de log según necesites: 'info', 'warn', 'error', etc.
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

export default logger;
