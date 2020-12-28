const usuariosCtrol = {};

//Modelo
const usuario = require('../models/usuario');


usuariosCtrol.crearUsuario = async (req, res) =>{
    let errors = [];
    const { nombre, email, pass, confirm_pass } = req.body;
    if (pass != confirm_pass) {
        errors.push({ text: "Las constraseñas no coinciden." });
    }

    if (pass.length < 4) {
        errors.push({ text: "La contraseña debe de tener al menos 4 caracteres." });
    }

    if (errors.length > 0) {
        res.json(errors);
    } else {
        const existeEmail = await usuario.findOne({ email: email });
        if (existeEmail) {
            res.json({
                
            });
        } else {
            //Creamos el usuario
            const newUser = new usuario({ nombre, email, pass });
            newUser.password = await newUser.encriptar(pass);
            await newUser.save();
            res.json({
                status : 'OK',
                message : 'Usuario creado'
            });
        }
    }    
};

usuariosCtrol.getUsuarios = async (req, res) =>{
    const usuarios = await usuario.find();
    res.json(usuarios);
};

usuariosCtrol.eliminarUsuario = async (req, res) => {
    const user = await usuario.findByIdAndDelete(req.params.id)
    .then (db => {
        res.json({
            status : "OK",
            respuesta : "Usuario eliminado." 
        })
    })
    .catch(err => {
        res.json({
            status : "KO",
            respuesta : "Error en la BBDD."
        });
    });
    
}

module.exports = usuariosCtrol;

