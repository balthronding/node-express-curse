const usuariosCtrol = {};

//Modelo
const usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const TOKEN_SECRET = process.env.TOKEN_SECRET || 'secretkey';

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
        res.status(400).json({
                status : 'KO',
                respuesta : "Error al crear el usuario",
                respuestas : errors

            });        
    } else {
        const existeEmail = await usuario.findOne({ email: email });
        if (existeEmail) {
            errors.push({text: "Este email ya está siendo utilizado"});
            res.status(400).json({
                status : 'KO',
                respuesta : "Error al crear el usuario",
                respuestas : error
            });
        } else {
            //Creamos el usuario
            const newUser = new usuario({ nombre, email, pass });
            newUser.pass = await newUser.encriptar(pass);
            await newUser.save();
            const token = jwt.sign({_id: newUser._id}, TOKEN_SECRET, {
                expiresIn: 60*60
            });
            res.json({
                status : 'OK',
                respuesta : 'Usuario creado',
                usuario : {
                    idUsuario : newUser._id,
                    nombre : newUser.nombre,
                    email : newUser.email
                },
                token : token
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
        res.status(500).json({
            status : "KO",
            respuesta : "Error en la BBDD."
        });
    });
    
}

usuariosCtrol.login = async (req, res) => {
    const { email, pass } = req.body;
    
    const user = await usuario.findOne({email});
    if(!user) {
        return res.status(400).json({
            status : "KO",
            respuesta : "Identificación incorrecta."
        });
    }

    if (!await user.matchPass(pass)) {
        return res.status(400).json({
            status : "KO",
            respuesta : "Identificación incorrecta."
        }); 
    }

    const token = jwt.sign({_id: user._id}, TOKEN_SECRET, {
        expiresIn: 60*60
    });
    return res.json({
        status : "OK",
        respuesta : "Identificación correcta.",
        usuario : {
            idUsuario : user._id,
            nombre : user.nombre,
            email : user.email
        },
        token : token
    });
}

usuariosCtrol.obtenerUsuario = async (req, res) => {
    const user = await usuario.findById(req.params.id)
    .then (db => {
        res.json({
            status : "OK",
            respuesta : "Usuario tratado",
            usuario : {
                idUsuario : user._id,
                nombre : user.nombre,
                email : user.email
            }     
        })
    })
    .catch(err => {
        res.status(500).json({
            status : "KO",
            respuesta : "Error en la BBDD."
        });
    });
}

usuariosCtrol.actualizarUsuario = async (req, res) => {
    
    let errors = [];
    const { nombre, email, pass, confirm_pass } = req.body;
    if (pass != confirm_pass) {
        errors.push({ text: "Las constraseñas no coinciden." });
    }

    if (pass.length < 4) {
        errors.push({ text: "La contraseña debe de tener al menos 4 caracteres." });
    }

    if (errors.length > 0) {
        res.status(400).json({
                status : 'KO',
                respuesta : "Error al actualizar el usuario",
                respuestas : errors

            });        
    } else {
        //const newUser = new usuario({ nombre, email, pass });        
        //let pass_encriptada  = await newUser.encriptar(pass);
        const user = await usuario.findById(req.params.id);
        if (user) {
            let pass_encriptada = await user.encriptar(pass);
            await usuario.findByIdAndUpdate(req.params.id,  { nombre, email, pass : pass_encriptada})
            .then (db => {
                res.json({
                    status : "OK",
                    respuesta : "Usuario actualizado correctamente." 
                })
            })
            .catch(err => {
                console.log(err);       
                res.json({
                    status : "KO",
                    respuesta : "Error al actualizar el usuario."                
                });
            });
        }       
    }   
}


module.exports = usuariosCtrol;

