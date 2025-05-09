

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Importa el middleware de autenticación
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Simulamos una base de datos de usuarios
const users = [
    {
        id: 1,
        email: 'usuario@dominio.com',
        password: bcrypt.hashSync('12345', 8), // Contraseña encriptada
    },
];

// Ruta de login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
            return res.status(500).json({ message: 'Error en la autenticación' });
        }

        if (!isMatch) {
            return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
        }

        // Generar un JWT
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            'mi_clave_secreta',
            { expiresIn: '1h' }
        );

        res.json({ token });
    });
});

// Ruta de registro
router.post('/register', (req, res) => {
    const { email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Encriptamos contraseña
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Creamos un nuevo usuario
    const newUser = {
        id: users.length + 1,
        email,
        password: hashedPassword,
    };
    users.push(newUser);

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
});

// Rutas protegidas (requieren autenticación)
router.get('/tienda', authMiddleware, (req, res) => {
    res.json({ message: 'Bienvenido a la tienda', user: req.user });
});

router.get('/almacen', authMiddleware, (req, res) => {
    res.json({ message: 'Bienvenido al almacen', user: req.user });
});

module.exports = router;