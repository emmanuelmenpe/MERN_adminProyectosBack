const TareaModel = require('../models/Tarea');
const proyectoModel = require('../models/Proyecto');
const {validationResult} = require('express-validator');

exports.crearTarea = async(req, res) => {
    try {
        //obtener errores de validacion si lo hay
        const errores = validationResult(req);

        if (!errores.isEmpty()) {
            return res.status(400).json({errores:errores.array()});
        }

        //extraer el id de proyecto 
        const {proyecto} = req.body;

        //buscar proyecto
        const existeProyecto = await proyectoModel.findById(proyecto)

        //comprobar si existe proyecto
        if (!existeProyecto) {
            return res.status(404).json({msg:'proyecto no encontrado'});
        }

        //validar si proyecto es del usuario        
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg:'no tiene autorizacion de creacion en este proyecto'});
        }

        //crear tarea 
        const tarea = new TareaModel(req.body);
        await tarea.save();

        res.status(200).json({msg:'tarea creada'})

    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'hubo un error'})
    }
}

exports.obtenerTareas = async (req,res) => {
    try {
        //extraer el id de proyecto 
        const {proyecto} = req.query;//al enviar params desde front la consulta se lee con .query

        //buscar proyecto por id
        const existeProyecto = await proyectoModel.findById(proyecto)

        //comprobar si existe proyecto
        if (!existeProyecto) {
            return res.status(404).json({msg:'proyecto no encontrado'});
        }

        //validar si proyecto es del usuario        
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg:'no tiene autorizacion de obtencion de tareas en este proyecto'});
        }

        //obtener tareas de proyectos
        const tareas = await TareaModel.find({proyecto}).sort({'creado': -1});//.sort obtener tareas ordenadas por fecha de creacion
        res.status(200).json(tareas);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'hubo un error'});
    }
}

exports.editarTarea = async(req,res) => {
    try {     
        //extraer el id de proyecto, nombre, estado
        const {proyecto, nombre, estado} = req.body;

        //buscar tarea por id
        let tarea = await TareaModel.findById(req.params.id);
        
        //comprobar existencia de tarea
        if (!tarea) {
            return res.status(404).json({msg:'tarea no existe'});
        }

        //buscar proyecto por id
        const Proyecto = await proyectoModel.findById(proyecto)

        //validar si proyecto es del usuario        
        if (Proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg:'no tiene autorizacion de edicion de la tarea en este proyecto'});
        }

        //crear objeto con la nueva informacion
        const tareaEditada = {};

        //determinar que esta editando
        tareaEditada.estado = estado;
        tareaEditada.nombre = nombre;
        

        //guardar
        tarea = await TareaModel.findByIdAndUpdate({_id:req.params.id}, tareaEditada, {new:true});

        res.status(200).json({msg:'tarea editada'});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'hubo un error'});
    }
}

exports.eliminarTarea = async(req,res) => {
    try {
        //extraer el id de proyecto, nombre, estado
        const {proyecto} = req.query;//al enviar params desde front la consulta se lee con .query

        //buscar tarea por id
        let tarea = await TareaModel.findById(req.params.id);

        //comprobar existencia de tarea
        if (!tarea) {
            return res.status(404).json({msg:'tarea no existe'});
        }

        //buscar proyecto por id
        const Proyecto = await proyectoModel.findById(proyecto)
        
        //validar si proyecto es del usuario        
        if (Proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg:'no tiene autorizacion de edicion de la tarea en este proyecto'});
        }

        //eliminar
        await TareaModel.findOneAndRemove({_id:req.params.id});

        res.status(200).json({msg: 'tarea eliminada'});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'hubo un error'});
    }
}