require('dotenv').config({
    path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
});
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const errorHandler = require('./middleware/errorHandler');
const app = express();
const moviesRoutes = require('./routes/routesMovie'); 
const usersRoutes = require('./routes/routesUser'); 
const PORT = process.env.PORT || 5000;

console.log("DEBUG >>> MONGO_URI =", process.env.MONGO_URI);

// Middleware con límite de 5MB para JSON y URL encoded
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

const allowebOrigins = process.env.FRONTEND_URL || 'http://localhost:3000';

app.use(cors({
  origin: allowebOrigins, // Permite solicitudes solo desde este origen
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Ruta
app.use('/api',moviesRoutes);

app.use('/api',usersRoutes);


// Manejo del error PayloadTooLargeError
app.use((err, req, res, next) => {
    if (err.type === 'entity.too.large') {
        return res.status(413).json({
            message: 'La imagen es demasiado grande. Intenta con una menor a 5MB.'
        });
    }
    next(err);
    
});

// Middleware de manejor de Error
app.use(errorHandler);


// Conectar a MongoDB
const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI; 
        if (!uri) {
            throw new Error('MONGO_URI no está definido en .env');
        }
        await mongoose.connect(uri);
        console.log('✅ Conectado a MongoDB 🚀');
    } catch (error) {
        console.error('❌ Error al conectar con MongoDB:', error);
    }
};

connectDB();


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


module.exports = app;