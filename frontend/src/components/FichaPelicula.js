import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/fichaPelicula.scss';
import api from '../axios'; // Importamos el cliente Axios configurado

const FichaPelicula = () => {
  const { id } = useParams();
  const [pelicula, setPelicula] = useState(null);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPelicula = async () => {
      try {
        const response = await api.get(`http://localhost:5000/api/obtener_peliculas/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPelicula(response.data);
      } catch (err) {
        console.error('Error al obtener la película:', err);
        setError('No se pudo cargar la información de la película.');
      }
    };

    fetchPelicula();
  }, [id, token]);

  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!pelicula) return <div>Cargando...</div>;

  return (
    <div className='ficha-pelicula'>
      <h2>{pelicula.title}</h2>
      <img src={pelicula.poster} alt={pelicula.title} style={{ width: '200px' }} />
      <p><strong>Descripción:</strong> {pelicula.description}</p>
      <p><strong>Género:</strong> {pelicula.genre.join(', ')}</p>
      <p><strong>Año:</strong> {pelicula.year}</p>
    </div>
  );
};

export default FichaPelicula;
