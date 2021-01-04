const { Router } = require('express');

const router = Router();

const controllerNotas = require('../controllers/notas.controllers');

router.post('/api/nota', controllerNotas.crearNota);

router.delete('/api/nota/:id', controllerNotas.borrarNota);

router.get('/api/nota/:id', controllerNotas.obtenerNotas);

module.exports = router;