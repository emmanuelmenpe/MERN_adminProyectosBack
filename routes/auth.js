const express = require ('express');
const {check} = require('express-validator');
const authController = require('../controllers/AuthController');
const authMidldleware = require('../middleware/auth');
const router = express.Router();

router.post('/',
    [   //reglas de validaciones
        check('email', 'email no valido').isEmail(),
        check('password', 'password debe de tener minimo 6 caracteres').isLength({min:6})
    ],
    authController.autenticarUsuario
);

router.get('/',
    authMidldleware,
    authController.usuarioAutenticado
);


module.exports = router;