// Importamos bcryptjs para cifrar y comparar contraseñas
const bcrypt = require('bcryptjs');

// Importamos el modelo de usuario
const User = require("../models/User");

// Importamos jsonwebtoken para generar y verificar JWT
const jwt = require('jsonwebtoken');

// Importamos el sistema de logging personalizado
const logger = require('../utils/logger');

// ==============================================
// Registrar un nuevo usuario
// ==============================================
const createUser = async (req, res) => {
    try {
        // Extraemos los campos del cuerpo de la petición
        const { name, email, password, role } = req.body;

        // Validamos que todos los campos obligatorios estén presentes
        if (!name || !email || !password) {
            logger.warn('Faltan campos obligatorios en la solicitud de registro');
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Verificamos si ya existe un usuario con ese correo
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            logger.warn(`El correo electrónico ${email} ya está registrado`);
            return res.status(400).json({ message: "El correo electrónico ya está registrado." });
        }

        // Encriptamos la contraseña con un salt generado
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creamos el nuevo usuario con la contraseña cifrada
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'user' // Si no se especifica rol, se asigna 'user' por defecto
        });

        // Guardamos el usuario en la base de datos
        await newUser.save();

        // Registramos el evento en el logger
        logger.info(`Usuario registrado con éxito: ${name} (${email})`);

        // Respondemos con éxito y devolvemos el usuario
        res.status(201).json({ message: "Usuario registrado con éxito.", user: newUser });
    } catch (error) {
        // Si ocurre un error, lo registramos y respondemos con error 500
        logger.error(`Error al registrar el usuario: ${error.message}`);
        res.status(500).json({ message: "Error al registrar el usuario." });
    }
};

// ==============================================
// Iniciar sesión de usuario
// ==============================================
const loginUser = async (req, res) => {
    // Extraemos email y contraseña del body
    const { email, password } = req.body;

    try {
        // Buscamos el usuario por email
        const user = await User.findOne({ email });

        // Si no existe, devolvemos error
        if (!user) {
            logger.warn(`Usuario no encontrado: ${email}`);
            return res.status(400).json({ mensaje: 'Usuario no encontrado' });
        }

        // Comparamos la contraseña ingresada con la almacenada
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            logger.warn(`Contraseña incorrecta para el usuario: ${email}`);
            return res.status(400).json({ mensaje: 'Contraseña incorrecta' });
        }

        // Generamos un token JWT con el ID del usuario y su rol
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET, // Clave secreta desde las variables de entorno
            { expiresIn: '1h' } // El token expira en una hora
        );

        logger.info(`Usuario logueado con éxito: ${email}`);

        // Enviamos el token y los datos del usuario como respuesta
        res.json({ token, user });
    } catch (err) {
        logger.error(`Error en el inicio de sesión del usuario: ${err.message}`);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};

// ==============================================
// Exportamos las funciones para usarlas en rutas
// ==============================================
module.exports = { createUser, loginUser };
