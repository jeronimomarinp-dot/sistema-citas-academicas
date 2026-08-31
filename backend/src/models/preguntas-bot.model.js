const connection = require('../config/db');

// CREAR PREGUNTA

function crearPregunta(datos) {

    return new Promise((resolve, reject) => {

        const sql = `
            INSERT INTO preguntas_bot
            (
                pregunta,
                respuesta,
                area_id,
                coordinador_id,
                activo
            )
            VALUES (?, ?, ?, ?, 1)
        `;

        connection.query(
            sql,
            [
                datos.pregunta,
                datos.respuesta,
                datos.area_id,
                datos.coordinador_id
            ],
            (error, result) => {

                if (error) {
                    return reject(error);
                }

                resolve(result);

            }
        );

    });

}

// OBTENER PREGUNTAS DEL COORDINADOR

function obtenerPreguntasPorCoordinador(coordinador_id) {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT
                p.id_pregunta,
                p.pregunta,
                p.respuesta,
                p.area_id,
                a.nombre AS area,
                p.coordinador_id,
                p.activo,
                p.created_at,
                p.updated_at

            FROM preguntas_bot p

            LEFT JOIN areas a
                ON p.area_id = a.id_area

            WHERE p.coordinador_id = ?

            ORDER BY p.created_at DESC
        `;

        connection.query(
            sql,
            [coordinador_id],
            (error, results) => {

                if (error) {
                    return reject(error);
                }

                resolve(results);

            }
        );

    });

}

// ACTUALIZAR PREGUNTA

function actualizarPregunta(
    id_pregunta,
    coordinador_id,
    datos
) {

    return new Promise((resolve, reject) => {

        const sql = `
            UPDATE preguntas_bot

            SET
                pregunta = ?,
                respuesta = ?,
                area_id = ?

            WHERE id_pregunta = ?
            AND coordinador_id = ?
        `;

        connection.query(
            sql,
            [
                datos.pregunta,
                datos.respuesta,
                datos.area_id,
                id_pregunta,
                coordinador_id
            ],
            (error, result) => {

                if (error) {
                    return reject(error);
                }

                resolve(result);

            }
        );

    });

}

// ACTIVAR / DESACTIVAR PREGUNTA

function cambiarEstado(
    id_pregunta,
    coordinador_id,
    activo
) {

    return new Promise((resolve, reject) => {

        const sql = `
            UPDATE preguntas_bot

            SET activo = ?

            WHERE id_pregunta = ?
            AND coordinador_id = ?
        `;

        connection.query(
            sql,
            [
                activo,
                id_pregunta,
                coordinador_id
            ],
            (error, result) => {

                if (error) {
                    return reject(error);
                }

                resolve(result);

            }
        );

    });

}

// OBTENER PREGUNTAS ACTIVAS

function obtenerPreguntasActivas(area_id) {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT
                p.id_pregunta,
                p.pregunta,
                p.respuesta,
                p.area_id,
                a.nombre AS area,
                p.coordinador_id

            FROM preguntas_bot p

            LEFT JOIN areas a
                ON p.area_id = a.id_area

            WHERE p.activo = 1
            AND p.area_id = ?

            ORDER BY p.pregunta ASC
        `;

        connection.query(
            sql,
            [area_id],
            (error, results) => {

                if (error) {
                    return reject(error);
                }

                resolve(results);

            }
        );

    });

}


module.exports = {
    crearPregunta,
    obtenerPreguntasPorCoordinador,
    actualizarPregunta,
    cambiarEstado,
    obtenerPreguntasActivas
};