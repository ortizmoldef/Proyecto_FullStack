import React from 'react';
import useAdminPeliculas from '../hook/useAdminPeliculas'; // Importamos el hook
import '../styles/adminPeliculas.scss'; // Importa el archivo SCSS

const AdminPeliculas = () => {
  const {
    peliculas,
    error,
    loading,
    handleEditar,
    handleEliminar,
  } = useAdminPeliculas();

  if (loading) return <p>Cargando películas...</p>;  // Si está cargando, mostramos el mensaje

  return (
    <div className="admin-peliculas">
      <h2 className="admin-peliculas__titulo">Películas</h2>
      {error && <p className="admin-peliculas__error">{error}</p>} 
      {peliculas.length === 0 ? (
        <p className="admin-peliculas__mensaje">No hay películas disponibles.</p>  // Si no hay películas, mostramos un mensaje
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
                  aria-label={`Editar ${pelicula.title}`}
                >
                  Editar
                </button>
                <button
                  className="admin-peliculas__eliminar"
                  onClick={() => handleEliminar(pelicula._id)}
                  aria-label={`Eliminar ${pelicula.title}`}
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
