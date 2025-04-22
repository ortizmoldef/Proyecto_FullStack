import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/adminPeliculas.scss'; // Importa el archivo SCSS
import api from '../axios'; // Importamos el cliente Axios configurado

const AdminPeliculas = () => {
  // Estado para almacenar las películas y manejar errores
  const [peliculas, setPeliculas] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);  // Estado de carga
  const token = localStorage.getItem('token');  // Token de autenticación
  const navigate = useNavigate();  // Hook para navegación

  // useEffect para obtener las películas al cargar el componente
  useEffect(() => {
    const obtenerPeliculas = async () => {
      try {
        // Petición GET para obtener las películas desde la API
        const response = await api.get('/api/obtener_peliculas', {
          headers: {
            Authorization: `Bearer ${token}`,  // Enviar el token en las cabeceras
          },
        });
        setPeliculas(response.data);  // Almacenamos las películas en el estado
      } catch (error) {
        // Si ocurre un error, mostramos el mensaje
        console.error('❌ Error al obtener películas:', error);
        setError('No se pudieron cargar las películas');
      } finally {
        // Después de obtener las películas o en caso de error, dejamos de mostrar el indicador de carga
        setLoading(false);  
      }
    };

    obtenerPeliculas();  // Llamamos a la función para obtener las películas
  }, [token]);  // Se ejecuta cada vez que cambia el token

  // Función para manejar la edición de una película
  const handleEditar = (id) => {
    navigate(`/modificar_pelicula/${id}`);  // Redirige a la página de edición de la película
  };

  // Función para manejar la eliminación de una película
  const handleEliminar = (id) => {
    // Confirmación antes de eliminar la película
    if (window.confirm('¿Estás seguro de que deseas eliminar esta película?')) {
      eliminarPelicula(id);  // Llamamos a la función para eliminar la película
    }
  };

  // Función para eliminar la película en la API
  const eliminarPelicula = async (id) => {
    try {
      // Petición DELETE para eliminar la película
      await api.delete(`/api/eliminar_pelicula/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,  // Enviar el token en las cabeceras
        },
      });
      // Actualizamos la lista de películas eliminando la película de la lista local
      setPeliculas(peliculas.filter((pelicula) => pelicula._id !== id)); 
    } catch (error) {
      // Si ocurre un error, mostramos el mensaje
      console.error('❌ Error al eliminar la película:', error);
      setError('No se pudo eliminar la película');
    }
  };

  // Si las películas aún están cargando, mostramos el mensaje "Cargando..."
  if (loading) return <p>Cargando películas...</p>;

  return (
    <div className="admin-peliculas">
      <h2 className="admin-peliculas__titulo">Películas</h2>
      {error && <p className="admin-peliculas__error">{error}</p>}  // Mostramos el mensaje de error si hay uno
      {peliculas.length === 0 ? (
        <p className="admin-peliculas__mensaje">No hay películas disponibles.</p>  // Si no hay películas, mostramos un mensaje
      ) : (
        // Si hay películas, las mostramos en una lista
        <ul className="admin-peliculas__lista">
          {peliculas.map((pelicula) => (
            <li key={pelicula._id} className="admin-peliculas__item">
              <div className="admin-peliculas__info">
                {pelicula.poster && (
                  // Mostramos el póster de la película si existe
                  <img
                    src={pelicula.poster}
                    alt={`Póster de ${pelicula.title}`}
                    className="admin-peliculas__poster"
                  />
                )}
                <div>
                  <strong>{pelicula.title}</strong> - {pelicula.genre}
                </div>
              </div>
              <div className="admin-peliculas__acciones">
                {/* Botón para editar la película */}
                <button
                  className="admin-peliculas__editar"
                  onClick={() => handleEditar(pelicula._id)}
                  aria-label={`Editar ${pelicula.title}`}  // Mejora de accesibilidad
                >
                  Editar
                </button>
                {/* Botón para eliminar la película */}
                <button
                  className="admin-peliculas__eliminar"
                  onClick={() => handleEliminar(pelicula._id)}
                  aria-label={`Eliminar ${pelicula.title}`}  // Mejora de accesibilidad
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminPeliculas;
