const bcrypt = require('bcryptjs');
const User = require("../models/User");
const jwt = require('jsonwebtoken');

// Crear Usuario en el registro
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Verificar si todos los campos están presentes
        if (!name || !email || !password) {
            return res.status(400).json({ error: "El nombre, email y la contraseña son obligatorios" });
        }

        // Verificar si el usuario ya existe
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "El usuario con este correo electrónico ya existe" });
        }

        // Cifrar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear el nuevo usuario
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({
            message: "Usuario creado exitosamente",
            user: { id: newUser._id, name: newUser.name, email: newUser.email }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear el usuario" });
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

        // Verificar si la contraseña proporcionada coincide con la almacenada (cifrada con bcrypt)
        const isMatch = await bcrypt.compare(password, user.password);  // Usamos bcrypt para comparar las contraseñas
        if (!isMatch) {
            return res.status(400).json({ error: "Contraseña incorrecta" });
        }

        // Generar el token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Devolver el token al usuario
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al iniciar sesión" });
    }
};


module.exports = { createUser, loginUser};


