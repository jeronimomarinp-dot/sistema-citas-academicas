const express = require('express');

const router = express.Router();

const verificarToken =
    require('../middleware/auth.middleware');

const notificacionesController =
    require('../controller/notificaciones.controller');

// OBTENER NOTIFICACIONES

router.get(
    '/notificaciones',
    verificarToken,
    notificacionesController.obtenerNotificaciones
);

// MARCAR NOTIFICACIÓN COMO LEÍDA

router.put(
    '/notificaciones/:id/leida',
    verificarToken,
    notificacionesController.marcarComoLeida
);


module.exports = router;