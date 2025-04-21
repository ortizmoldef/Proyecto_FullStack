import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || process.env.REACT_APP_API_URL_LOCAL,
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
