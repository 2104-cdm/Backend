// routes/authRoutes.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Importa el middleware desde la nueva ubicación
const authMiddleware = require('../middleware/authMiddleware'); //asegurarse de que la ruta sea correcta
const router = express.Router();//

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

    // busca el primer elemento del array que cumpla una condición
    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
    }

    // Comparamos la contraseña ingresada con la encriptada
    //Compara la contraseña ingresada (password) con la contraseña encriptada del usuario (user.password).
//Esta función es asíncrona y usa un callback.
    bcrypt.compare(password, user.password, (err, isMatch) => {
        // isMatch es un booleano que indica si las contraseñas coinciden
        // err es un error si ocurre durante la comparación
        if (err) {
            return res.status(500).json({ message: 'Error en la autenticación' });
        }

        if (!isMatch) {
            return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
        }

        // Generar un JWT
        const token = jwt.sign({ userId: user.id, email: user.email }, 'mi_clave_secreta', { expiresIn: '1h' });

        // Enviar el token como respuesta
        res.json({ token });
    });
});
const listaUsuarios = [];

// Ruta de registro
router.post('/register', (req, res) => {
    const { email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya existe' });
    }
    //encritamos contrasena
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Crear un nuevo usuario
    const newUser = {
        id: users.length + 1,
        email,
        password: hashedPassword,
        
    };
    users.push(newUser);

    // Agregar el nuevo usuario a la lista de usuarios
    // Si newUser es un array, lo convertimos a un array de un solo elemento
    const usuarios = Array.isArray(newUser) ? newUser : [newUser];
    usuarios.map((user) => {
        listaUsuarios.push(user);
    });
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
});



// Ruta protegida (requiere autenticación)
router.get('/tienda', authMiddleware, (req, res) => {
    // Solo se ejecutará si el token es válido
    res.json({ message: 'Bienvenido a la tienda', user: req.user });
});
router.get('/almacen', authMiddleware, (req, res) => {
    // Solo se ejecutará si el token es válido
    res.json({ message: 'Bienvenido al almacen', user: req.user });
});

module.exports = router;
