import axios from 'axios';

const isLocalhost = window.location.hostname === 'localhost';

const api = axios.create({
  baseURL: isLocalhost
    ? 'http://localhost:5000/api' // Asegúrate de que la URL sea correcta
    : 'https://proyectoback-five.vercel.app/api', // URL de producción
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
