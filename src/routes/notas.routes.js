const { Router } = require('express');

const router = Router();

const controllerNotas = require('../controllers/notas.controllers');

router.post('/api/crearNota', controllerNotas.crearNota);

router.delete('/api/borrarNota/:id', controllerNotas.borrarNota);

module.exports = router;