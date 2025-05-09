// routes/ventasRoutes.js
const express = require('express');
const router = express.Router();
const { obtenerVentas, registrarVenta, despacharVenta } = require('../controllers/ventasController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, obtenerVentas);
router.patch('/:idVenta/despachar', authMiddleware, despacharVenta);
router.post('/', authMiddleware, registrarVenta);


module.exports = router;
