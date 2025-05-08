const express = require('express');
const router = express.Router();
const { getCarrito, saveCarrito } = require('../controllers/carritoController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getCarrito);
router.post('/', authMiddleware, saveCarrito);

module.exports = router;
