const express = require('express');
const proyectoController = require('../controllers/ProyectoController');
const authMiddleware = require('../middleware/auth');
const {check} = require('express-validator');

const router = express.Router();

//crear
router.post('/', 
    authMiddleware,//valida que se cumpla antes de pasar a la siguiente linea
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
);

//obtener
router.get('/', 
    authMiddleware,//valida que se cumpla antes de pasar a la siguiente linea
    proyectoController.obtenerProyectos
);

//editar
router.put('/:id', 
    authMiddleware,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty()
    ],
    proyectoController.actualizarProyecto
);

//eliminar
router.delete('/:id', 
    authMiddleware,
    proyectoController.eliminarProyecto
);

module.exports = router;
