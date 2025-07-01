

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {registroUsuarios} = require('../controllers/usuarios.controller')


// Importa el middleware de autenticación
const authMiddleware = require('../middleware/authMiddleware');
const { conectiondb } = require('../db/cliente.db');

const router = express.Router();



router.get('/tienda', authMiddleware, (req, res) => {
    res.json({ message: 'Bienvenido a la tienda', user: req.user });
});

router.get('/almacen', authMiddleware, (req, res) => {
    res.json({ message: 'Bienvenido al almacen', user: req.user });
});

module.exports = router;


