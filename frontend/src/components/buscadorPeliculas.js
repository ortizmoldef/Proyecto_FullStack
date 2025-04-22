import React from 'react';
import '../styles/buscador.scss';

const BuscadorPeliculas = ({ setSearchTerm, onBorrarBusqueda }) => {
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value); // Actualizamos el término de búsqueda
  };

  return (
    <div className="buscador">
      <h3>Lista de Películas</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Buscar películas..."
          onChange={handleSearchChange} // Llamamos a manejarCambio cuando el texto cambia
        />
        <button type="button" onClick={onBorrarBusqueda}>Buscar</button>
      </form>
    </div>
  );
};

export default BuscadorPeliculas;