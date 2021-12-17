const JWT = require('jsonwebtoken');

module.exports = function (req, res, next) {
    //leer el token del header
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({msg:'no hay token, permiso no valido'})
    }

    try {
        const cifrado = JWT.verify(token, process.env.SECRETA);

        //agregar una propiedad nueva al req
        req.usuario = cifrado.usuario;//usuario prociene de usuarioController en linea 37
        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({mag:`token no valido`});   
    }
    
}