const { loginUser } = require('../controllers/login.controller');
const express = require('express');
const router = express.Router();



router.post('/iniciarSeccion',  loginUser );


module.exports = router;
