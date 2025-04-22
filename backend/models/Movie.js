const mongoose = require("mongoose");  // Importa la librería mongoose para interactuar con MongoDB

// Crea el Esquema de una Pelicula
const movieSchema = new mongoose.Schema({
  // El campo 'title' es obligatorio y debe ser de tipo String, es el título de la película
  title: { type: String, required: true },

  // El campo 'description' es obligatorio y debe ser de tipo String, describe la película
  description: { type: String, required: true },

  // El campo 'genre' es un arreglo de Strings, que almacena los géneros de la película
  genre: [{ type: String, required: true }],

  // El campo 'year' es obligatorio, debe ser de tipo Number y representa el año de estreno de la película
  year: { type: Number, required: true },

  // El campo 'poster' es opcional, de tipo String, puede almacenar la URL o el Base64 de la imagen del póster
  poster: { type: String },

  // El campo 'rating' es opcional, de tipo Number, y debe estar en el rango de 0 a 10
  rating: { type: Number, min: 0, max: 10 }
});

// Exporta el modelo de Pelicula basado en el esquema definido
module.exports = mongoose.model("Movie", movieSchema);
