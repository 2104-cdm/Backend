const { migrarProductos } = require("../controllers/migrarProductos.controller");
const express = require('express');
const router = express.Router();


 router.get('/migrar', migrarProductos);


module.exports = router;