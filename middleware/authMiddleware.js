const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    
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
    