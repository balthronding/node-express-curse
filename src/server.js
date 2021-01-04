const express = require('express');
const cors = require('cors');

const path = require('path');


// Iniciar
const app = express();

// Configuraciones

app.set('port', process.env.PORT || 4000); // Podemos 
app.set('views', path.join(__dirname, 'views')); //Path con el modulo de node, que me abstrae del sistema operativo.

//Middlewares

app.use(express.json()); //Codificar JSON de entrada.
app.use(express.urlencoded({extended:false})); //Codificar JSON de entrada.
app.use(cors());

//Variables globales

//Rutas
app.use(require('./routes/usuarios.routes'));
app.use(require('./routes/notas.routes'));



//Archivos
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;