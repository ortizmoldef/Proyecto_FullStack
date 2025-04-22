import React, { useEffect, useState } from 'react';  // Importamos React, useEffect y useState
import { useParams } from 'react-router-dom';  // Importamos useParams para obtener el ID de la URL
import '../css/fichaPelicula.scss';  // Importamos el archivo SCSS para los estilos
import api from '../axios';  // Importamos el cliente Axios configurado para hacer peticiones

const FichaPelicula = () => {
  const { id } = useParams();  // Obtenemos el ID de la película desde la URL
  const [pelicula, setPelicula] = useState(null);  // Estado para almacenar los datos de la película
  const [error, setError] = useState('');  // Estado para manejar los errores
  const token = localStorage.getItem('token');  // Obtenemos el token de autenticación desde el localStorage

  useEffect(() => {
    // Función que hace la petición a la API para obtener los detalles de la película
    const fetchPelicula = async () => {
      try {
        // Hacemos la petición GET a la API con el ID de la película y el token de autenticación
        const response = await api.get(`/api/obtener_peliculas/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,  // Enviamos el token en los encabezados para autorización
          },
        });
        setPelicula(response.data);  // Almacena los datos de la película en el estado 'pelicula'
      } catch (err) {
        console.error('Error al obtener la película:', err);  // Manejamos cualquier error que ocurra en la petición
        setError('No se pudo cargar la información de la película.');  // Actualizamos el estado de error
      }
    };

    fetchPelicula();  // Llamamos a la función para hacer la petición cuando el componente se monta

  }, [id, token]);  // Dependencias: se vuelve a ejecutar si cambia el 'id' o el 'token'

  if (error) return <div style={{ color: 'red' }}>{error}</div>;  // Si hay un error, lo mostramos
  if (!pelicula) return <div>Cargando...</div>;  // Si no hay película aún (está cargando), mostramos un mensaje de carga

  return (
    <div className='ficha-pelicula'>  {/* Contenedor principal del detalle de la película */}
      <h2>{pelicula.title}</h2>  {/* Título de la película */}
      <img src={pelicula.poster} alt={pelicula.title} style={{ width: '200px' }} />  {/* Imagen del póster de la película */}
      <p><strong>Descripción:</strong> {pelicula.description}</p>  {/* Descripción de la película */}
      <p><strong>Género:</strong> {pelicula.genre.join(', ')}</p>  {/* Género(s) de la película */}
      <p><strong>Año:</strong> {pelicula.year}</p>  {/* Año de estreno de la película */}
    </div>
  );
};

export default FichaPelicula;
