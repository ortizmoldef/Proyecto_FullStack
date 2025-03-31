import 'dotenv/config';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'] 
}));

// LLamando al archivo .ENV, es la dirección de la BD
const mongoURI = process.env.MONGO_URI;

// Conectar a MongoDB
const connectdb = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Conectado a MongoDB');
    } catch (err) {
        console.error('Error al conectar con MongoDB:', err);
    }
};

// Llamada a la conexión
connectdb();

// Ruta principal 
app.get('/', (req, res) => {
    res.send('API funcionando');
});

// Llamada al puerto para el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
