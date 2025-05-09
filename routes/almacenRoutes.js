// routes/almacenRoutes.js
const express = require('express');
const router  = express.Router();
const authMiddleware       = require('../middleware/authMiddleware');
const { actualizarInventario } = require('../controllers/almacenController');
// Si en un futuro necesitas despachar ventas desde este mismo router:
// const { despacharVenta } = require('../controllers/ventasController');

router.patch('/:id', authMiddleware, actualizarInventario);

module.exports = router;
