const express = require('express');
const router = express.Router();

//Controlador
const usuarioController = require('../controllers/usuarioController');

//Midlleware que verifica si el usuario está logueado.
const { requireAuth } = require("../middlewares/auth");

router.post('/register', usuarioController.register);
router.post('/login', usuarioController.login);
router.get('/welcome', requireAuth, usuarioController.welcome);

module.exports = router;