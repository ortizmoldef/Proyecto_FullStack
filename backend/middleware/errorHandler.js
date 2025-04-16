// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log del error
  
    if (err.status === 404) {
      return res.status(404).json({ error: 'Recurso no encontrado' });
    }
  
    // Errores internos del servidor
    res.status(500).json({ error: 'Error interno del servidor. Intente más tarde.' });
  };
  
  module.exports = errorHandler;
  