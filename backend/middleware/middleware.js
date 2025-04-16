const jwt = require('jsonwebtoken');

const authJWT = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensaje: "No se proporcionó el token" });
  }

  try {
    // Verificar el token con la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    console.error('Error al verificar el token:', err);

    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ mensaje: "El token ha expirado. Por favor, inicie sesión nuevamente." });
    }

    if (err.name === 'JsonWebTokenError') {
      return res.status(403).json({ mensaje: "Token inválido. Por favor, inicie sesión nuevamente." });
    }

    return res.status(500).json({ mensaje: "Error al procesar el token. Intente de nuevo." });
  }
};

module.exports = authJWT;
