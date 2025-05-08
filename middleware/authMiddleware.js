// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
// Middleware para verificar el token JWT
// Este middleware se encarga de verificar si el token JWT es válido y si el usuario está autenticado

const authMiddleware = (req, res, next) => {
    //si el token es valid llama a next() para continuar con la siguiente función o ruta
    // Obtener el token del header de la solicitud
    const token = req.headers['authorization'];
    // este token es el que se envía en la cabecera de la solicitud HTTP, generalmente en el formato "Bearer <

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
        // Esto permite acceder a la información del usuario en las siguientes funciones o rutas
        // Por ejemplo, puedes acceder a req.user.userId o req.user.email
        next();  // Continuar con la siguiente función o ruta
    });
};

module.exports = authMiddleware;
