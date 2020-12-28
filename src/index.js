require('dotenv').config(); //Generar variables de entorno

const app = require('./server');

const bbdd = require('./database');

app.listen(app.get('port'), ()=> {
    console.log('Servidor en puerto', app.get('port'));
});