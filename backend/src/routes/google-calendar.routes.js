const express = require('express');

const router = express.Router();

const verificarToken =
    require('../middleware/auth.middleware');

const verificarRol =
    require('../middleware/roles.middleware');

const googleCalendarController =
    require('../controller/google-calendar.controller');


router.get(
    '/auth',
    verificarToken,
    verificarRol('coordinador'),
    googleCalendarController.generarAutorizacion
);

router.get(
    '/callback',
    googleCalendarController.procesarCallback
);

router.get(
    '/test',
    verificarToken,
    verificarRol('coordinador'),
    googleCalendarController.probarConexion
);

router.post(
    '/test-event',
    verificarToken,
    verificarRol('coordinador'),
    googleCalendarController.crearEventoPrueba
);


module.exports = router;