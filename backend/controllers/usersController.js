const bcrypt = require('bcryptjs');
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');  // Importamos el logger

// Crear Usuario en el registro
const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            logger.warn('Faltan campos obligatorios en la solicitud de registro');
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Verificar si el correo ya está registrado
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            logger.warn(`El correo electrónico ${email} ya está registrado`);
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

        logger.info(`Usuario registrado con éxito: ${name} (${email})`);

        res.status(201).json({ message: "Usuario registrado con éxito.", user: newUser });
    } catch (error) {
        logger.error(`Error al registrar el usuario: ${error.message}`);
        res.status(500).json({ message: "Error al registrar el usuario." });
    }
};

// Logear el usuario una vez que esta creado.
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar al usuario por email
        const user = await User.findOne({ email });

        if (!user) {
            logger.warn(`Usuario no encontrado: ${email}`);
            return res.status(400).json({ mensaje: 'Usuario no encontrado' });
        }

        // Verificar la contraseña
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            logger.warn(`Contraseña incorrecta para el usuario: ${email}`);
            return res.status(400).json({ mensaje: 'Contraseña incorrecta' });
        }

        // Generar el token
        const token = jwt.sign(
            { userId: user._id, role: user.role },  // Carga los datos del usuario en el token
            process.env.JWT_SECRET,  // La clave secreta que usas en el backend
            { expiresIn: '1h' }  // El token expira en 1 hora
        );

        logger.info(`Usuario logueado con éxito: ${email}`);

        // Enviar el token como respuesta
        res.json({ token, user });  // Enviar el token y los datos del usuario
    } catch (err) {
        logger.error(`Error en el inicio de sesión del usuario: ${err.message}`);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};

module.exports = { createUser, loginUser };
