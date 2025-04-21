import axios from 'axios';

const isLocalhost = window.location.hostname === 'localhost';

const api = axios.create({
  baseURL: isLocalhost
    ? 'http://localhost:5000/api'
    : 'https://proyectoback-five.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
