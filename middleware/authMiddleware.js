// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Obtener el token del header de la solicitud
    const token = req.headers['authorization'];

    // Si no hay token, respondemos con error
    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    // Verificamos el token usando la clave secreta
    jwt.verify(token, 'mi_clave_secreta', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        // Si el token es válido, agregamos la información del usuario al request
        req.user = decoded;
        next();  // Continuar con la siguiente función o ruta
    });
};

module.exports = authMiddleware;
