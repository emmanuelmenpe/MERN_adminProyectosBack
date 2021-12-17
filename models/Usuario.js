const mongoose = require('mongoose');

const UsuariosSchema = mongoose.Schema({
    nombre:{
        type: String,
        require: true,
        trim: true,
    },
    email:{
        type: String,
        require: true,
        trim: true,
        unique: true,
    },
    password:{
        type: String,
        require: true,
        trim: true,  
    },
    registro:{
        type: Date,
        default:Date.now(),
    },

})

//                              nombre de modelo y el schema
module.exports = mongoose.model('Usuario', UsuariosSchema);