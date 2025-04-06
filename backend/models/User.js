const mongoose = require("mongoose");

// Crea el esquema de un Usuario
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'admin'],  // Limita el valor de 'role' a 'user' o 'admin'
    default: 'user',  // El valor por defecto es 'user'
  },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

// Exporta el modelo de Usuario
module.exports = mongoose.model("User", userSchema);
