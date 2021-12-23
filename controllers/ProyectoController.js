const ProyectoModel = require('../models/Proyecto');
const {validationResult } = require('express-validator');

exports.crearProyecto = async(req, res) => {

    //obtener errores de validacion si lo hay
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(400).json({errores:errores.array()});
    }

    try {
        const proyecto = new ProyectoModel(req.body);

        //guardar propietario via JWT
        proyecto.creador = req.usuario.id//usuario.id prociene de usuarioController en linea 37

        proyecto.save();

        res.status(200).json({msg:'proyecto creado'});
    } catch (error) {
        console.log(error);
        res.status(500).json({mag:`error: ${error.message}`});
    }
}

exports.obtenerProyectos = async(req, res) => {
    try {
        const proyectos = await ProyectoModel.find({creador: req.usuario.id}).sort({creado: -1});
        res.json({proyectos}); 
    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un errror')
    }
}

exports.actualizarProyecto = async(req, res) => {
    //obtener errores de validacion si lo hay
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(400).json({errores:errores.array()});
    }

    const {nombre} = req.body;
    const proyectoEditado = {};

    if (nombre) {
        proyectoEditado.nombre= nombre;
    }

    try {
        //obtener el id
        let proyecto = await ProyectoModel.findById(req.params.id);

        //compravar si existe proyecto
        if (!proyecto) {
            return res.status(404).json({msg: 'proyecto no encontrado'});
        }

        //verificar quien creo el proyecto
        if (proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg:'no tiene autorizacion de modificacion'});
        }

        //guardar
        proyecto = await ProyectoModel.findByIdAndUpdate({_id:req.params.id}, {$set:proyectoEditado}, {new:true});

        res.json({proyecto});

    } catch (error) {
        console.log(error);
        return res.status(500).json(`error: ${error.message}`);
    }
}

exports.eliminarProyecto = async(req, res) => {
    try {
        //obtener el proyecto por id
        let proyecto = await ProyectoModel.findById(req.params.id);

        //compravar si existe proyecto
        if (!proyecto) {
            return res.status(404).json({msg: 'proyecto no encontrado'});
        }

        //verificar quien creo el proyecto
        if (proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg:'no tiene autorizacion de eliminacion'});
        }

        //eliminar
        await ProyectoModel.findOneAndRemove({_id:req.params.id});

        res.json({msg: 'proyecto eliminado'});
    } catch (error) {
        console.log(error);
        return res.status(500).json(`error: ${error.message}`);
    }
}