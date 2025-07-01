const express = require('express');
const { obtenerProductos } = require('../controllers/mostrarProducto.controller');
const router = express.Router();




router.get('/', obtenerProductos);








module.exports = router;