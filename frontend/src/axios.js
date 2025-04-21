import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000', // Usa la variable de entorno o localhost por defecto
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
