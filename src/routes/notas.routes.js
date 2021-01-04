const { Router } = require('express');

const router = Router();

const controllerNotas = require('../controllers/notas.controllers');

router.post('/api/nota', controllerNotas.crearNota);

router.get('/api/nota/:id', controllerNotas.obtenerNotas);

router.delete('/api/nota/:id', controllerNotas.borrarNota);

module.exports = router;