const { Router } = require('express');

const router = Router();

const controllerUsuario = require('../controllers/usuarios.controllers');
const verificarToken = require('../helpers/seguridad');

router.get('/api/prueba', (req, res) =>{
    console.log("Estoy en la API");
    let params = req.params;
    console.log(req.params.id);
    res.json({
        respuesta : "OK",
        parametros : `${params}`        
    })

})

router.get('/api/usuarios', controllerUsuario.getUsuarios);

router.post('/api/usuarios', controllerUsuario.crearUsuario);

router.delete('/api/usuarios/:id', controllerUsuario.eliminarUsuario);

router.post('/api/login', controllerUsuario.login);

router.get('/api/usuarios/:id', controllerUsuario.obtenerUsuario);

router.put('/api/usuarios/:id',controllerUsuario.actualizarUsuario);

module.exports = router;


