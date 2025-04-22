const mongoose = require("mongoose");  // Importa la librería mongoose para trabajar con MongoDB

// Crea el esquema de un Usuario
const userSchema = new mongoose.Schema({
  // El campo 'name' es de tipo String y es obligatorio
  name: { type: String, required: true },

  // El campo 'email' es de tipo String, es obligatorio y debe ser único en la base de datos
  email: { type: String, required: true, unique: true },

  // El campo 'password' es de tipo String y es obligatorio
  password: { type: String, required: true },

  // El campo 'role' es de tipo String y solo puede tener los valores 'user' o 'admin'
  role: {
    type: String,
    enum: ['user', 'admin'],  // Limita el valor de 'role' a 'user' o 'admin'
    default: 'user',  // El valor por defecto es 'user' si no se especifica otro
  },

  // El campo 'favorites' es un arreglo de referencias a películas (de tipo ObjectId),
  // donde cada objeto en el arreglo se relaciona con un documento de la colección "Movie"
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

// Exporta el modelo de Usuario basado en el esquema definido
module.exports = mongoose.model("User", userSchema);
