const express = require('express');

const router = express.Router();

const verificarToken =
    require('../middleware/auth.middleware');

const verificarRol =
    require('../middleware/roles.middleware');

const preguntasBotController =
    require('../controller/preguntas-bot.controller');

// CREAR PREGUNTA

router.post(
    '/preguntas-bot',
    verificarToken,
    verificarRol('coordinador'),
    preguntasBotController.crearPregunta
);

// OBTENER PREGUNTAS DEL COORDINADOR

router.get(
    '/preguntas-bot/coordinador',
    verificarToken,
    verificarRol('coordinador'),
    preguntasBotController.obtenerPreguntasPorCoordinador
);

// ACTUALIZAR PREGUNTA

router.put(
    '/preguntas-bot/:id',
    verificarToken,
    verificarRol('coordinador'),
    preguntasBotController.actualizarPregunta
);

// ACTIVAR / DESACTIVAR PREGUNTA

router.put(
    '/preguntas-bot/:id/estado',
    verificarToken,
    verificarRol('coordinador'),
    preguntasBotController.cambiarEstado
);

// OBTENER PREGUNTAS ACTIVAS

router.get(
    '/preguntas-bot/activas',
    verificarToken,
    verificarRol('estudiante'),
    preguntasBotController.obtenerPreguntasActivas
);


module.exports = router;