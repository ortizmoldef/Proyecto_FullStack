const mongoose = require("mongoose");


// Crea el Esquema de una Pelicula
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genre: [{ type: String, required: true }],
  year: { type: Number, required: true },
  poster: { type: String }, // URL o Base64
  rating: { type: Number, min: 0, max: 10 }
});

module.exports = mongoose.model("Movie", movieSchema);
