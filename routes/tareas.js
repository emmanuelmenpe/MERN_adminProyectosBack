const express = require('express');
const tareaController = require('../controllers/TareaController');
const authMiddleware = require('../middleware/auth');
const {check} = require('express-validator');

const router = express.Router();

//crear
router.post('/', 
    authMiddleware,//valida que se cumpla antes de pasar a la siguiente linea
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('proyecto', 'El proyecto es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea
);

router.get('/',
    authMiddleware,
    tareaController.obtenerTareas
);

router.put('/:id',
    authMiddleware,
    tareaController.editarTarea
);

router.delete('/:id',
    authMiddleware,
    tareaController.eliminarTarea
);


module.exports = router;