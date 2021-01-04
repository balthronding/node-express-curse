const { Router } = require('express');

const router = Router();

const controllerUsuario = require('../controllers/usuarios.controllers');

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



module.exports = router;


