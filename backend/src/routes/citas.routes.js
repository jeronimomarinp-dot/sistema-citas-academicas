const express = require('express');

const router = express.Router();

const verificarToken =
    require('../middleware/auth.middleware');

const verificarRol =
    require('../middleware/roles.middleware');

const citasController =
    require('../controller/citas.controller');


// ========================================
// CREAR CITA
// ========================================

router.post(
    '/citas',
    verificarToken,
    verificarRol('estudiante'),
    citasController.crearCita
);


// ========================================
// OBTENER CITAS DEL COORDINADOR
// ========================================

router.get(
    '/citas/coordinador/:id',
    verificarToken,
    verificarRol('coordinador'),
    citasController.obtenerCitasCoordinador
);


// ========================================
// ACTUALIZAR ESTADO DE CITA
// ========================================

router.put(
    '/citas/:id',
    verificarToken,
    verificarRol('coordinador'),
    citasController.actualizarEstado
);


// ========================================
// OBTENER CITAS DEL ESTUDIANTE
// ========================================

router.get(
    '/citas/estudiante/:id',
    verificarToken,
    verificarRol('estudiante'),
    citasController.obtenerCitasEstudiante
);


// ========================================
// ESTADISTICAS DEL ESTUDIANTE
// ========================================

router.get(
    '/estadisticas/estudiante/:id',
    verificarToken,
    verificarRol('estudiante'),
    (req, res) => {

        const id_estudiante =
            req.params.id;

        const sql = `
            SELECT

                COUNT(*) AS total,

                SUM(
                    CASE
                        WHEN estado = 'pendiente'
                        THEN 1
                        ELSE 0
                    END
                ) AS pendientes,

                SUM(
                    CASE
                        WHEN estado = 'aceptada'
                        THEN 1
                        ELSE 0
                    END
                ) AS aceptadas,

                SUM(
                    CASE
                        WHEN estado = 'rechazada'
                        THEN 1
                        ELSE 0
                    END
                ) AS rechazadas

            FROM citas

            WHERE id_estudiante = ?
        `;

        const connection =
            require('../config/db');

        connection.query(
            sql,
            [id_estudiante],
            (error, results) => {

                if (error) {

                    console.log(error);

                    return res.status(500).json({
                        mensaje:
                            'Error obteniendo estadísticas'
                    });

                }

                res.json(results[0]);

            }
        );

    }
);


// ========================================
// ESTADISTICAS DEL COORDINADOR
// ========================================

router.get(
    '/estadisticas/coordinador/:id',
    verificarToken,
    verificarRol('coordinador'),
    (req, res) => {

        const id_coordinador =
            req.params.id;

        const sql = `
            SELECT

                COUNT(*) AS total,

                SUM(
                    CASE
                        WHEN estado = 'pendiente'
                        THEN 1
                        ELSE 0
                    END
                ) AS pendientes,

                SUM(
                    CASE
                        WHEN estado = 'aceptada'
                        THEN 1
                        ELSE 0
                    END
                ) AS aceptadas,

                SUM(
                    CASE
                        WHEN estado = 'rechazada'
                        THEN 1
                        ELSE 0
                    END
                ) AS rechazadas

            FROM citas

            WHERE id_coordinador = ?
        `;

        const connection =
            require('../config/db');

        connection.query(
            sql,
            [id_coordinador],
            (error, results) => {

                if (error) {

                    console.log(error);

                    return res.status(500).json({
                        mensaje:
                            'Error obteniendo estadísticas'
                    });

                }

                res.json(results[0]);

            }
        );

    }
);

router.get(
    '/citas/coordinador/:id/fecha/:fecha',
    verificarToken,
    verificarRol('estudiante'),
    citasController.obtenerCitasPorCoordinadorFecha
);

router.get(
    '/citas/ocupadas/:id',
    verificarToken,
    verificarRol('estudiante'),
    citasController.obtenerHorasOcupadas
);

module.exports = router;