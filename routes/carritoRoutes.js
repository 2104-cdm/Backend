// routes/carritoRoutes.js

const express = require('express');
const router = express.Router();
const { obtenerCarrito, agregarAlCarrito, eliminarDelCarrito,   } = require('../controllers/carritoController');
const authMiddleware = require('../middleware/authMiddleware');


// Obtener el carrito
router.get('/', authMiddleware, obtenerCarrito);

// Agregar un producto al carrito
router.post('/', authMiddleware, agregarAlCarrito);

// Eliminar un producto del carrito por ID
router.delete('/:idProducto', authMiddleware, eliminarDelCarrito);

module.exports = router;

/*
  Sugerencias de mejora:
  1. Validar la estructura del body con una librería como Joi o express-validator.
  2. Manejar posibles errores del controlador con un middleware de manejo de errores.
  3. Estandarizar rutas RESTful: usar DELETE para eliminar productos.
*/
