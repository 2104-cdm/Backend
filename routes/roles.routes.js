const express = require('express');
const { Roles } = require('../controllers/roles.controller');
const router = express.Router();



router.get('/',  Roles );



module.exports =  router
