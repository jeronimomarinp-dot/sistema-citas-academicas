const connection = require('../config/db');


function crearCita(datos) {

    return new Promise((resolve, reject) => {

        const sql = `
            INSERT INTO citas
            (
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
                datos.id_estudiante,
                datos.id_coordinador,
                datos.fecha,
                datos.hora,
                datos.motivo
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


function obtenerCitasCoordinador(id_coordinador) {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT
                citas.*,
                usuarios.nombre AS estudiante

            FROM citas

            INNER JOIN usuarios
                ON citas.id_estudiante =
                   usuarios.id_usuario

            WHERE citas.id_coordinador = ?

            ORDER BY
                fecha ASC,
                hora ASC
        `;

        connection.query(
            sql,
            [id_coordinador],
            (error, results) => {

                if (error) {
                    return reject(error);
                }

                resolve(results);

            }
        );

    });

}


function obtenerCitasEstudiante(id_estudiante) {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT
                citas.*,
                usuarios.nombre AS coordinador

            FROM citas

            INNER JOIN usuarios
                ON citas.id_coordinador =
                   usuarios.id_usuario

            WHERE citas.id_estudiante = ?

            ORDER BY
                fecha DESC,
                hora DESC
        `;

        connection.query(
            sql,
            [id_estudiante],
            (error, results) => {

                if (error) {
                    return reject(error);
                }

                resolve(results);

            }
        );

    });

}


function actualizarEstado(idCita, estado) {

    return new Promise((resolve, reject) => {

        const sql = `
            UPDATE citas
            SET estado = ?
            WHERE id_cita = ?
        `;

        connection.query(
            sql,
            [
                estado,
                idCita
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

function existeCita(id_coordinador, fecha, hora) {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT id_cita
            FROM citas
            WHERE id_coordinador = ?
            AND fecha = ?
            AND hora = ?
            AND estado IN ('pendiente', 'aceptada')
            LIMIT 1
        `;

        connection.query(
            sql,
            [
                id_coordinador,
                fecha,
                hora
            ],
            (error, results) => {

                if (error) {
                    return reject(error);
                }

                resolve(results.length > 0);

            }
        );

    });

}

function obtenerCitasPorCoordinadorFecha(id_coordinador, fecha) {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT hora
            FROM citas
            WHERE id_coordinador = ?
            AND fecha = ?
            AND estado IN ('pendiente', 'aceptada')
            ORDER BY hora ASC
        `;

        connection.query(
            sql,
            [
                id_coordinador,
                fecha
            ],
            (error, results) => {

                if (error) {
                    return reject(error);
                }

                resolve(results);

            }
        );

    });

}

function obtenerHorasOcupadas(id_coordinador, fecha) {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT hora
            FROM citas
            WHERE id_coordinador = ?
            AND fecha = ?
            AND estado IN ('pendiente', 'aceptada')
            ORDER BY hora ASC
        `;

        connection.query(
            sql,
            [
                id_coordinador,
                fecha
            ],
            (error, results) => {

                if (error) {
                    return reject(error);
                }

                resolve(results);

            }
        );

    });

}

function obtenerCitaPorId(idCita) {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT
                citas.id_cita,
                citas.id_estudiante,
                citas.id_coordinador,
                DATE_FORMAT(citas.fecha, '%Y-%m-%d') AS fecha,
TIME_FORMAT(citas.hora, '%H:%i:%s') AS hora,
                citas.motivo,
                citas.estado,
                usuarios.nombre AS estudiante

            FROM citas

            INNER JOIN usuarios
                ON citas.id_estudiante =
                   usuarios.id_usuario

            WHERE citas.id_cita = ?

            LIMIT 1
        `;

        connection.query(
            sql,
            [idCita],
            (error, results) => {

                if (error) {
                    return reject(error);
                }

                if (results.length === 0) {
                    resolve(null);
                    return;
                }

                resolve(results[0]);

            }
        );

    });

}

module.exports = {
    crearCita,
    obtenerCitasCoordinador,
    obtenerCitasEstudiante,
    actualizarEstado,
    existeCita,
    obtenerCitasPorCoordinadorFecha,
    obtenerHorasOcupadas,
    obtenerCitaPorId
};