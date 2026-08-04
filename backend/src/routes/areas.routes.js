const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const verificarToken = require('../middleware/auth.middleware');
const verificarRol = require('../middleware/roles.middleware');

router.get('/areas', (req, res) => {

    const sql = `
        SELECT
            id_area,
            nombre
        FROM areas
        WHERE estado = 1
        ORDER BY nombre ASC
    `;

    connection.query(sql, (error, results) => {

        if (error) {

            console.log(error);

            return res.status(500).json({
                mensaje: 'Error obteniendo áreas'
            });

        }

        res.json(results);

    });

});

// OBTENER TODAS LAS AREAS
router.get(
    '/admin/areas',
    verificarToken,
    verificarRol('admin'),
    (req, res) => {

        const sql = `
        SELECT *
        FROM areas
        ORDER BY nombre
    `;

        connection.query(sql, (error, results) => {

            if (error) {

                console.log(error);

                return res.status(500).json({
                    mensaje: 'Error obteniendo áreas'
                });

            }

            res.json(results);

        });

    });

//CREAR AREAS 
router.post(
    '/admin/areas',
    verificarToken,
    verificarRol('admin'),
    (req, res) => {

        const { nombre } = req.body;

        const verificar = `
        SELECT id_area
        FROM areas
        WHERE nombre = ?
    `;

        connection.query(
            verificar,
            [nombre],
            (error, existe) => {

                if (error) {

                    console.log(error);

                    return res.status(500).json({
                        mensaje: 'Error verificando área'
                    });

                }

                if (existe.length > 0) {

                    return res.status(400).json({
                        mensaje: 'El área ya existe'
                    });

                }

                const sql = `
                INSERT INTO areas
                (
                    nombre,
                    estado
                )
                VALUES
                (?, 1)
            `;

                connection.query(
                    sql,
                    [nombre],
                    (error, result) => {

                        if (error) {

                            console.log(error);

                            return res.status(500).json({
                                mensaje: 'Error creando área'
                            });

                        }

                        res.json({
                            mensaje: 'Área creada correctamente'
                        });

                    }
                );

            }
        );

    });

//ACTIVAR O DESACTIVAR AREA
router.put(
    '/admin/areas/:id',
    verificarToken,
    verificarRol('admin'),
    (req, res) => {

        const id = req.params.id;

        const { estado } = req.body;

        const sql = `
        UPDATE areas
        SET estado = ?
        WHERE id_area = ?
    `;

        connection.query(
            sql,
            [estado, id],
            (error, result) => {

                if (error) {

                    console.log(error);

                    return res.status(500).json({
                        mensaje: 'Error actualizando área'
                    });

                }

                res.json({
                    mensaje: 'Estado actualizado'
                });

            }
        );

    });
module.exports = router;