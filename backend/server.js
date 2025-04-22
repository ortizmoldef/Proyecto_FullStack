require('dotenv').config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
});
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); // ✅ Nuevo: Helmet para seguridad
const debug = require('debug')('app:main'); // ✅ Nuevo: Debug para logs
const errorHandler = require('./middleware/errorHandler');
const app = express();
const moviesRoutes = require('./routes/routesMovie'); 
const usersRoutes = require('./routes/routesUser'); 
const logger = require('./utils/logger'); // Logger con Winston
const PORT = process.env.PORT || 5000;

// ✅ Helmet: seguridad HTTP
app.use(helmet());

// Middleware con límite de 5MB para JSON y URL encoded
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

const allowedOrigins = [
  'https://proyecto-full-stack-beta.vercel.app',
  'http://localhost:3000'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Origen permitido
    } else {
      callback(new Error('Origen no permitido')); // Origen no permitido
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rutas de la API
app.use('/api', moviesRoutes);
app.use('/api', usersRoutes);

// Logs con Debug
debug('Rutas cargadas: /api/movies y /api/users');

// Manejo del error PayloadTooLargeError
app.use((err, req, res, next) => {
  if (err.type === 'entity.too.large') {
      return res.status(413).json({
          message: 'La imagen es demasiado grande. Intenta con una menor a 5MB.'
      });
  }
  next(err);
});

// Middleware de manejo de Error
app.use(errorHandler);

// Conectar a MongoDB
const connectDB = async () => {
  try {
      const uri = process.env.MONGO_URI; 
      if (!uri) {
          throw new Error('MONGO_URI no está definido en .env');
      }
      await mongoose.connect(uri);
      logger.info('✅ Conectado a MongoDB 🚀');
      debug('Conexión a MongoDB exitosa'); // ✅ Log con Debug
  } catch (error) {
      logger.error('❌ Error al conectar con MongoDB:', error);
      debug('Error al conectar con MongoDB: %O', error); // ✅ Log con Debug
  }
};

connectDB();

// Iniciar el servidor
app.listen(PORT, () => {
  logger.info(`Servidor corriendo en http://localhost:${PORT}`);
  debug(`Servidor corriendo en puerto ${PORT}`); // ✅ Log con Debug
});

module.exports = app;
