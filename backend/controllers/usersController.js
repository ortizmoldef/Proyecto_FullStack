const bcrypt = require('bcryptjs');
const User = require("../models/User");
const jwt = require('jsonwebtoken');

// Crear Usuario en el registro
const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

         if (!name || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
            }
    
        // Verificar si el correo ya está registrado
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: "El correo electrónico ya está registrado." });
        }
    
        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        // Crear el nuevo usuario
        const newUser = new User({
          name,
          email,
          password: hashedPassword,
          role: role || 'user' // Si no se proporciona un role, se asigna 'user' por defecto
        });
    
        // Guardar el usuario en la base de datos
        await newUser.save();
    
        res.status(201).json({ message: "Usuario registrado con éxito.", user: newUser });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al registrar el usuario." });
      }
};

// Logear el usuario una vez que esta creado.

const loginUser = async (req, res) => {
    const { email, password } = req.body;

  try {
    // Buscar al usuario por email (debes asegurarte de verificar que el usuario existe)
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ mensaje: 'Usuario no encontrado' });
    }

    // Aquí debes verificar que la contraseña es correcta (esto dependerá de cómo guardas las contraseñas)
    // Por ejemplo, usando bcrypt:
    // const match = await bcrypt.compare(password, user.password);
    // if (!match) return res.status(400).json({ mensaje: 'Contraseña incorrecta' });

    // Generar el token
    const token = jwt.sign(
      { userId: user._id, role: user.role },  // Carga los datos del usuario en el token
      process.env.JWT_SECRET,  // La clave secreta que usas en el backend
      { expiresIn: '1h' }  // El token expira en 1 hora
    );

    // Enviar el token como respuesta
    res.json({ token, user });  // Enviar el token y los datos del usuario
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
  };



module.exports = { createUser, loginUser};


