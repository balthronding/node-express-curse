const schema = require('mongoose').Schema;
const model = require('mongoose').model;

const nota = new schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    enlace: {
        type: String,
        required: true
    },
    puntuacion: {
        type : Number,
        require: false
    },
    precio:{
        type : Number,
        require: false
    },
    idUsuario: {
        type: String,
        required: true
    } 
}, {
    timestamps:true,
    versionKey: false
});

module.exports = model('nota', nota);