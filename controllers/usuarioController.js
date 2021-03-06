const UsuarioModel = require('../models/Usuario');
const bcrytjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const JWT = require('jsonwebtoken');

exports.crearUsuario = async(req, res) => {

    //obtener errores de validacion si lo hay
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(400).json({errores:errores.array()});
    }

    //extraer
    const {email, password} = req.body;

    try {
        let usuario= await UsuarioModel.findOne({email});

        if (usuario) {
            return res.status(400).json( {msg: 'el usuario ya existe'});
        }

        //crear usuario
        usuario = new UsuarioModel(req.body);

        //encriptar password
        const salt = await bcrytjs.genSalt(10);
        usuario.password = await bcrytjs.hash(password, salt);

        //guarda usuario
        await usuario.save();

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
