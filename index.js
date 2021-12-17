const express = require('express');
const conectarDB = require('./config/db');


const app = express();

conectarDB();

//habilitar express.json
app.use(express.json({extended: true}));//lo explica en el video 335 del curso

const PORT = process.env.PORT || 4000;

//definir pagina principal
app.get('/', (req, res) => {
    res.send('hola');
});

app.use('/api/usuarios', require('./routes/usuarios'));

//iniciar app
app.listen(PORT, () => {
    console.log(`servidor ejecutandose en puerto ${PORT}`);
});