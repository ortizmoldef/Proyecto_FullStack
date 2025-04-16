import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/adminPeliculas.scss'; // Importa el archivo SCSS

const AdminPeliculas = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerPeliculas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/obtener_peliculas', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPeliculas(response.data);
      } catch (error) {
        console.error('❌ Error al obtener películas:', error);
        setError('No se pudieron cargar las películas');
      }
    };

    obtenerPeliculas();
  }, [token]);

  const handleEditar = (id) => {
    navigate(`/modificar_pelicula/${id}`);
  };

  const handleEliminar = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/eliminar_pelicula/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPeliculas(peliculas.filter((pelicula) => pelicula._id !== id)); // Eliminar de la lista
    } catch (error) {
      console.error('❌ Error al eliminar la película:', error);
      setError('No se pudo eliminar la película');
    }
  };

  return (
    <div className="admin-peliculas">
      <h2 className="admin-peliculas__titulo">Películas</h2>
      {error && <p className="admin-peliculas__error">{error}</p>}
      {peliculas.length === 0 ? (
        <p className="admin-peliculas__mensaje">No hay películas disponibles.</p>
      ) : (
        <ul className="admin-peliculas__lista">
          {peliculas.map((pelicula) => (
            <li key={pelicula._id} className="admin-peliculas__item">
              <div className="admin-peliculas__info">
                {pelicula.poster && (
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
                <button
                  className="admin-peliculas__editar"
                  onClick={() => handleEditar(pelicula._id)}
                >
                  Editar
                </button>
                <button
                  className="admin-peliculas__eliminar"
                  onClick={() => handleEliminar(pelicula._id)}
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
