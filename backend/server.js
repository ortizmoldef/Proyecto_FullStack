require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const moviesRoutes = require('./routes/routesMovie'); 
const usersRoutes = require('./routes/routesUser'); 
const app = express();
const PORT = process.env.PORT || 5000;



app.use(express.json());

app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api', moviesRoutes)
;
app.use('/api', usersRoutes);

// Conectar a MongoDB
const mongoURI = process.env.MONGO_URI;

const connectdb = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('✅ Conectado a MongoDB');
    } catch (err) {
        console.error('❌ Error al conectar con MongoDB:', err);
    }
};

// Llamar la conexión
connectdb();



// Ruta principal
app.get('/', (req, res) => {
    res.send('🚀 API funcionando');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`);
});
