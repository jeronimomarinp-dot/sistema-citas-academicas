const express = require('express');

const router = express.Router();

const verificarToken =
    require('../middleware/auth.middleware');

const verificarRol =
    require('../middleware/roles.middleware');

const upload =
    require('../middleware/upload.middleware');

const materialesController =
    require('../controller/materiales.controller');



// SUBIR MATERIAL
router.post(
    '/',
    verificarToken,
    verificarRol('coordinador'),
    upload.single('archivo'),
    materialesController.crearMaterial
);

// MATERIALES DEL COORDINADOR
router.get(
    '/coordinador',
    verificarToken,
    verificarRol('coordinador'),
    materialesController.obtenerMaterialesCoordinador
);

// MATERIALES PARA ESTUDIANTES
router.get(
    '/',
    verificarToken,
    verificarRol('estudiante'),
    materialesController.obtenerMateriales
);

// DESCARGAR MATERIAL
router.get(
    '/:id/descargar',
    verificarToken,
    materialesController.descargarMaterial
);

// OBTENER MATERIAL POR ID
router.get(
    '/:id',
    verificarToken,
    materialesController.obtenerMaterial
);

// ACTIVAR / DESACTIVAR MATERIAL

router.put(
    '/:id/estado',
    verificarToken,
    verificarRol('coordinador'),
    materialesController.actualizarEstado
);

// ELIMINAR MATERIAL
router.delete(
    '/:id',
    verificarToken,
    verificarRol('coordinador'),
    materialesController.eliminarMaterial
);

module.exports = router;