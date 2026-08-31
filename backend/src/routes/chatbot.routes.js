const express = require('express');
const router = express.Router();
const verificarToken =
    require('../middleware/auth.middleware');
const verificarRol =
    require('../middleware/roles.middleware');
const chatbotController =
    require('../controller/chatbot.controller');

// PROCESAR PREGUNTA DEL ESTUDIANTE

router.post(
    '/chatbot/preguntar',
    verificarToken,
    verificarRol('estudiante'),
    chatbotController.responderPregunta
);

module.exports = router;