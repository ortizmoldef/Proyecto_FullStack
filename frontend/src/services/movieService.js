// src/api/movieService.js
import api from '../axios'; // Suponiendo que has configurado axios en un archivo separado

const getMovies = async (token) => {
  try {
    const response = await api.get('/api/obtener_peliculas', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Retornamos los datos de las películas
  } catch (err) {
    throw new Error('No se pudieron obtener las películas. Intenta más tarde.');
  }
};

const searchMovies = async (token, searchTerm) => {
  try {
    const response = await api.get(`/api/obtener_peliculas?search=${searchTerm}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Retornamos las películas filtradas
  } catch (err) {
    throw new Error('Error al buscar películas.');
  }
};


const createMovie = async (newMovie, token) => {
    try {
      const response = await api.post('/api/crear_peliculas', newMovie, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data; // Retorna los datos de la respuesta
    } catch (error) {
      if (error.response && error.response.status === 413) {
        throw new Error('La imagen o datos son demasiado grandes.');
      } else {
        throw new Error(error.response?.data?.message || 'Error al crear la película');
      }
    }
  };
  

  // Obtener una película por ID
const getMovieById = async (id, token) => {
    try {
      const response = await api.get(`/api/obtener_peliculas/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error('No se pudo obtener la película.');
    }
  };
  
// Actualizar una película por ID
const updateMovie = async (id, updatedMovie, token) => {
    try {
      const response = await api.put(`/api/modificar_pelicula/${id}`, updatedMovie, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error('No se pudo actualizar la película.');
    }
  };

// Puedes agregar más funciones como agregar, editar o borrar películas según sea necesario

export { getMovies, searchMovies, createMovie, getMovieById, updateMovie };
