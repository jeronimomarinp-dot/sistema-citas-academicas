const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const verificarToken = require('../middleware/auth.middleware');
const verificarRol = require('../middleware/roles.middleware');


// CREAR CITA

router.post(
    '/citas',
    verificarToken,
    verificarRol('estudiante'),
    (req, res) => {

    const {
        id_estudiante,
        id_coordinador,
        fecha,
        hora,
        motivo
    } = req.body;

    const sql = `
    
        INSERT INTO citas(
            id_estudiante,
            id_coordinador,
            fecha,
            hora,
            motivo
        )
        VALUES (?, ?, ?, ?, ?)
    
    `;

    connection.query(
        sql,
        [
            id_estudiante,
            id_coordinador,
            fecha,
            hora,
            motivo
        ],
        (error, result) => {

            if(error) {

                console.log(error);

                return res.status(500).json({
                    mensaje: 'Error creando cita'
                });

            }

            res.json({
                mensaje: 'Cita creada correctamente'
            });

        }
    );

});

// OBTENER CITAS DEL COORDINADOR

router.get(
    '/citas/coordinador/:id',
    verificarToken,
    verificarRol('coordinador'),
    (req, res) => {

    const id_coordinador = req.params.id;

    const sql = `

        SELECT
            citas.*,
            usuarios.nombre AS estudiante

        FROM citas

        INNER JOIN usuarios
            ON citas.id_estudiante = usuarios.id_usuario

        WHERE id_coordinador = ?

        ORDER BY fecha ASC, hora ASC

    `;

    connection.query(
        sql,
        [id_coordinador],
        (error, results) => {

            if(error) {

                console.log(error);

                return res.status(500).json({
                    mensaje: 'Error obteniendo citas'
                });

            }

            res.json(results);

        }
    );

});

// ACTUALIZAR ESTADO DE CITA

router.put(
    '/citas/:id',
    verificarToken,
    verificarRol('coordinador'),
    (req, res) => {

    const idCita = req.params.id;

    const { estado } = req.body;

    const sql = `
        UPDATE citas
        SET estado = ?
        WHERE id_cita = ?
    `;

    connection.query(
        sql,
        [estado, idCita],
        (error, result) => {

            if(error) {

                console.log(error);

                return res.status(500).json({
                    mensaje: 'Error actualizando cita'
                });

            }

            res.json({
                mensaje: 'Estado actualizado correctamente'
            });

        }
    );

});

// OBTENER CITAS DEL ESTUDIANTE

router.get(
    '/citas/estudiante/:id',
    verificarToken,
    verificarRol('estudiante'),
    (req, res) => {

    const id_estudiante = req.params.id;

    const sql = `

        SELECT
            citas.*,
            usuarios.nombre AS coordinador

        FROM citas

        INNER JOIN usuarios
            ON citas.id_coordinador = usuarios.id_usuario

        WHERE id_estudiante = ?

        ORDER BY fecha DESC, hora DESC

    `;

    connection.query(
        sql,
        [id_estudiante],
        (error, results) => {

            if(error) {

                console.log(error);

                return res.status(500).json({
                    mensaje: 'Error obteniendo citas'
                });

            }

            res.json(results);

        }
    );

});

// ESTADISTICAS DEL ESTUDIANTE

router.get(
    '/estadisticas/estudiante/:id',
    verificarToken,
    verificarRol('estudiante'),
    (req, res) => {

    const id_estudiante = req.params.id;

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

    connection.query(
        sql,
        [id_estudiante],
        (error, results) => {

            if(error){

                console.log(error);

                return res.status(500).json({
                    mensaje: 'Error obteniendo estadísticas'
                });

            }

            res.json(results[0]);

        }
    );

});

// ESTADISTICAS DEL COORDINADOR

router.get(
    '/estadisticas/coordinador/:id',
    verificarToken,
    verificarRol('coordinador'),
    (req, res) => {

    const id_coordinador = req.params.id;

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

    connection.query(
        sql,
        [id_coordinador],
        (error, results) => {

            if(error){

                console.log(error);

                return res.status(500).json({
                    mensaje: 'Error obteniendo estadísticas'
                });

            }

            res.json(results[0]);

        }
    );

});

module.exports = router;