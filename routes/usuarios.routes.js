const { registerUser } = require("../controllers/usuarios.controller");
const express = require('express');
const router = express.Router();



router.post('/registro', registerUser );



module.exports = router;