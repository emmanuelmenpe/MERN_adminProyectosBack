const express = require ('express');
const usuariosController = require('../controllers/usuarioController');
const {check} = require('express-validator');

const router = express.Router();


//crear usuraio
router.post('/',
    [   //reglas de validaciones
        check('nombre', 'el nombre es obligatorio').not().isEmpty(),
        check('email', 'email no valido').isEmail(),
        check('password', 'password debe de tener minimo 6 caracteres').isLength({min:6})
    ],
    usuariosController.crearUsuario
);

module.exports = router;