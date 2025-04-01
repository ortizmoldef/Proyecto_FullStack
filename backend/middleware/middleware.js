const jwt = require('jsonwebtoken');

const authJWT = async (req, res, next) => {
    // Verificar que el token esté presente en el encabezado Authorization
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Extracción correcta del token

    if (!token) {
        return res.status(401).json({ mensaje: "No se proporcionó el token" });
    }

    try {
        // Verificar el token usando await, esto es asíncrono
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        // Almacenamos el usuario decodificado en la request para usarlo en otras rutas si es necesario
        req.user = decoded;

        // Si el token es válido, pasamos al siguiente middleware o controlador
        next();
    } catch (err) {
        console.error(err);
        return res.status(403).json({ mensaje: "Token inválido o expirado" });
    }
};

module.exports = authJWT;
