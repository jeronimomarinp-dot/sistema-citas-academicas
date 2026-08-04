const express = require('express');

const router = express.Router();

const verificarToken = require('../middleware/auth.middleware');

const verificarRol = require('../middleware/roles.middleware');

const disponibilidadController = require('../controller/disponibilidad.controller');

router.post(
    '/',
    verificarToken,
    verificarRol('coordinador'),
    disponibilidadController.crearDisponibilidad
);

router.get(
    '/',
    verificarToken,
    verificarRol('coordinador'),
    disponibilidadController.obtenerDisponibilidad
);

router.put(
    '/:id',
    verificarToken,
    verificarRol('coordinador'),
    disponibilidadController.actualizarDisponibilidad
);

router.delete(
    '/:id',
    verificarToken,
    verificarRol('coordinador'),
    disponibilidadController.eliminarDisponibilidad
);
module.exports = router;
