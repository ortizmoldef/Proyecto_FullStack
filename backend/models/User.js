const mongoose = require("mongoose");

// Crea un el esquema de un Usuario
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }]
});

module.exports = mongoose.model("User", userSchema);
