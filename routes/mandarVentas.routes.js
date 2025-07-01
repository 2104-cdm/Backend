const { mandarVentasBD } = require("../controllers/mandarVentas.controller");
const authMiddleware = require("../middleware/authMiddleware");
const express = require('express');
const router = express.Router();



router.post('/',  mandarVentasBD);



module.exports = router;