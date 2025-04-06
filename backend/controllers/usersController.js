const bcrypt = require('bcryptjs');
const User = require("../models/User");
const jwt = require('jsonwebtoken');

// Crear Usuario en el registro
const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
    
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
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "El email y la contraseña son obligatorios" });
        }

        // Buscar el usuario por el correo electrónico
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Usuario no encontrado" });
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Contraseña incorrecta" });
        }

        // Generar el token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Devolver el token + info del usuario
        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role || 'user' // <- por si usas roles
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al iniciar sesión" });
    }
};



module.exports = { createUser, loginUser};


