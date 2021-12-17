const express = require('express');
const conectarDB = require('./config/db');
const usuarioRoute = require('./routes/usuarios');
const authRoute = require('./routes/auth');
const proyectoRoute = require('./routes/proyectos');

const app = express();

conectarDB();

//habilitar express.json
app.use(express.json({extended: true}));//lo explica en el video 335 del curso

const PORT = process.env.PORT || 4000;

//definir rutas
app.use('/api/usuarios', usuarioRoute);
app.use('/api/auth', authRoute);
app.use('/api/proyectos', proyectoRoute);

//iniciar app
app.listen(PORT, () => {
    console.log(`servidor ejecutandose en puerto ${PORT}`);
});