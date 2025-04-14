import React, { useState } from 'react';
import axios from 'axios';
import '../css/buscador.scss';

const BuscadorPeliculas = ({ onResultados, onBorrarBusqueda }) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const buscarPeliculas = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      onBorrarBusqueda(); // Si el campo de búsqueda está vacío, restauramos las películas
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/buscar_peliculas?query=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onResultados(response.data); // Pasamos los resultados de la búsqueda al componente padre
      setError('');
    } catch (err) {
      console.error(err);
      setError('Error al buscar películas');
    }
  };

  const manejarCambio = (e) => {
    setQuery(e.target.value); // Actualiza el estado del query mientras escribes
    if (!e.target.value.trim()) {
      onBorrarBusqueda(); // Si se borra el texto, restauramos las películas
    }
  };

  return (
    <div className="buscador">
      <form onSubmit={buscarPeliculas}>
        <input
          type="text"
          placeholder="Buscar películas..."
          value={query}
          onChange={manejarCambio} // Llamamos a manejarCambio cuando el texto cambia
        />
        <button type="submit">Buscar</button>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default BuscadorPeliculas;
