const UsuarioModel = require('../models/Usuario');
const bcrytjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const JWT = require('jsonwebtoken');

//api/auth
exports.autenticarUsuario = async(req, res) => {
    //obtener errores de validacion si lo hay
    const errores = validationResult(req);
    
    if (!errores.isEmpty()) {
        return res.status(400).json({errores:errores.array()});
    }

    const {email, password} = req.body;

    try {
        //buscar email
        let usuario = await UsuarioModel.findOne({email});
        
        if (!usuario) {
            console.log('usuario no eccontrado');
            return res.status(400).json({msg: 'el usuario no existe'});
        } 
        
        //comparar password
        const passwordCorrecto = await bcrytjs.compare(password, usuario.password);
        if (!passwordCorrecto) {
            console.log('contraseña no correcto');
            return res.status(400).json({msg: 'contraseña incorrecta'});
            
        }

        //crear  el json web token
        const payload = {
            usuario:{
                id: usuario.id
            }
        };

        //firmar el json web token
        JWT.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 //una hora
        }, (error, token) => {
            if (error) throw error;

            res.json( {token});
        });

    } catch (error) {
        console.log(error);   
        res.status(500).send(`hubo un error ${error.message}`);
    }
}

exports.usuarioAutenticado = async(req, res) => {
    try {
        const usuario = await UsuarioModel.findById(req.usuario.id).select('-password');
        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).send(`hubo un error ${error.message}`);
    }
}
