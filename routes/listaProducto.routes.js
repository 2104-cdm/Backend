const express = require('express');
const router = express.Router();
const importarProductos = require('../controllers/productos.controller');

router.post('/', importarProductos);

module.exports = router;
