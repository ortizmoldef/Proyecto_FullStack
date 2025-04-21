import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5000' // URL local en desarrollo
    : process.env.REACT_APP_API_URL, // URL desplegada en producción
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token dinámicamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
