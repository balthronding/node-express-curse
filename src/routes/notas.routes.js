const { Router } = require('express');

const router = Router();

const controllerNotas = require('../controllers/notas.controllers');
const verificarToken = require('../helpers/seguridad');
require('../helpers/seguridad');

router.post('/api/nota', verificarToken, controllerNotas.crearNota);

router.get('/api/nota/:id', verificarToken, controllerNotas.obtenerNotas);

router.delete('/api/nota/:id',verificarToken, controllerNotas.borrarNota);

router.put('/api/nota/:id', verificarToken, controllerNotas.actualizarNota);

module.exports = router;