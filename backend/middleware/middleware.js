const jwt = require('jsonwebtoken');  // Importamos la librería jsonwebtoken

// Middleware de autenticación JWT
const authJWT = async (req, res, next) => {
  // Extraemos el token de los encabezados de la solicitud
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  // Si no se proporciona el token, devolvemos un error 401 (No autorizado)
  if (!token) {
    return res.status(401).json({ mensaje: "No se proporcionó el token" });
  }

  try {
    // Intentamos verificar el token utilizando la clave secreta definida en el archivo de entorno (process.env.JWT_SECRET)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Si el token es válido, guardamos los datos decodificados del token (usuario) en la solicitud (req.user)
    req.user = decoded;

    // Continuamos con el siguiente middleware o la ruta
    next();
  } catch (err) {
    console.error('Error al verificar el token:', err);

    // Si el token ha expirado, respondemos con un mensaje de error 401
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ mensaje: "El token ha expirado. Por favor, inicie sesión nuevamente." });
    }

    // Si el token es inválido o no se puede verificar, respondemos con un mensaje de error 403
    if (err.name === 'JsonWebTokenError') {
      return res.status(403).json({ mensaje: "Token inválido. Por favor, inicie sesión nuevamente." });
    }

    // En caso de cualquier otro error durante el proceso, respondemos con un mensaje de error 500 (error interno del servidor)
    return res.status(500).json({ mensaje: "Error al procesar el token. Intente de nuevo." });
  }
};

module.exports = authJWT;  // Exportamos el middleware para usarlo en otras partes de la aplicación
