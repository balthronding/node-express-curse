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
            res.status(400).json({
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

    const token = jwt.sign({_id: user._id}, 'secretKey');
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

usuariosCtrol.verificarToken = async (req, res, next) => {
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
		return res.status(401).send('Solicitud no autorizada');
	}
}

module.exports = usuariosCtrol;

