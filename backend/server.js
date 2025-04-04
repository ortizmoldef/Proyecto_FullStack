require('dotenv').config({
    path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
});

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
console.log("DEBUG >>> MONGO_URI =", process.env.MONGO_URI);

const moviesRoutes = require('./routes/routesMovie'); 
const usersRoutes = require('./routes/routesUser'); 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rutas
app.use('/api', moviesRoutes);
app.use('/api', usersRoutes);

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

// Llamar la conexión
connectDB();

// Ruta principal
app.get('/', (req, res) => {
    res.send('🚀 API funcionando');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`);
});
