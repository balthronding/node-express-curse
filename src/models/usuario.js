const {Schema, model} = require('mongoose');
const bcryptjs = require('bcryptjs');

const usuario = new Schema({
    nombre: {
        type: String, 
        required: true        
    },
    email: {
        type: String, 
        required: true
    },
    pass: {
        type: String, 
        required: true 
    }
}, {
    timestamps: true,
    versionKey: false
});

//Crear método para encriptar la pass
usuario.methods.encriptar = async function (pass) {
    const salt = await bcryptjs.genSalt(10);    
    return await bcryptjs.hash(pass, salt);
};

usuario.methods.matchPass = async function(pass) {
    return await bcryptjs.compare(pass, this.pass);
}


module.exports = model('usuario', usuario);