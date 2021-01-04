const usuariosCtrol = {};

//Modelo
const usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');


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
                status : 'KO',
                respuesta : 'El correo ya está en uso'
            });
        } else {
            //Creamos el usuario
            const newUser = new usuario({ nombre, email, pass });
            newUser.pass = await newUser.encriptar(pass);
            await newUser.save();
            const token = jwt.sign({_id: newUser._id}, 'secretKey');
            res.json({
                status : 'OK',
                respuesta : 'Usuario creado',
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
        res.json({
            status : "KO",
            respuesta : "Error en la BBDD."
        });
    });
    
}

usuariosCtrol.login = async (req, res) => {
    const { email, pass } = req.body;

    const user = await usuario.findOne({email});
    if(!user) {
        return res.json({
            status : "KO",
            respuesta : "Identificación incorrecta."
        });
    }

    if (user.pass != pass) {
        return res.json({
            status : "KO",
            respuesta : "Identificación incorrecta."
        }); 
    }

    const token = jwt.sign({_id: user._id}, 'secretKey');
    return res.json({
        status : "OK",
        respuesta : "Identificación correcta.",
        token : token
    });
}

usuariosCtrol.verificarToken = (req, res, next) => {
    try {
		if (!req.headers.authorization) {
			return res.status(401).send('Solicitud no autorizada');
		}
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {
			return res.status(401).send('Solicitud no autorizada');
		}

		const payload = await jwt.verify(token, 'secretkey');
		if (!payload) {
			return res.status(401).send('Solicitud no autorizada');
		}
		req.userId = payload._id;
		next();
	} catch(e) {
		//console.log(e)
		return res.status(401).send('Solicitud no autorizada');
	}
}

module.exports = usuariosCtrol;

