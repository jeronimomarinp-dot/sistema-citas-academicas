const connection = require('../config/db');

function crearDisponibilidad(datos) {

    return new Promise((resolve, reject) => {

        const sql = `
            INSERT INTO disponibilidad_coordinador
            (
                coordinador_id,
                dia_semana,
                hora_inicio,
                hora_fin,
                duracion_cita,
                activo
            )
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        connection.query(

            sql,

            [
                datos.coordinador_id,
                datos.dia_semana,
                datos.hora_inicio,
                datos.hora_fin,
                datos.duracion_cita,
                1
            ],

            (error, resultado) => {

                if (error) {

                    return reject(error);

                }

                resolve(resultado);

            }

        );

    });

}

function obtenerDisponibilidadPorCoordinador(coordinador_id) {

    return new Promise((resolve, reject) => {

        const sql = `
    SELECT *
    FROM disponibilidad_coordinador
    WHERE coordinador_id = ?
    AND activo = 1
    ORDER BY
        FIELD(
            dia_semana,
            'Lunes',
            'Martes',
            'Miércoles',
            'Jueves',
            'Viernes',
            'Sábado',
            'Domingo'
        ),
        hora_inicio
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

function existeCruceHorario(datos) {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT *
            FROM disponibilidad_coordinador
            WHERE coordinador_id = ?
              AND dia_semana = ?
              AND activo = 1
              AND (
                    (? < hora_fin)
                AND (? > hora_inicio)
              )
        `;

        connection.query(

            sql,

            [
                datos.coordinador_id,
                datos.dia_semana,
                datos.hora_inicio,
                datos.hora_fin
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

function actualizarDisponibilidad(id, coordinador_id, datos) {

    return new Promise((resolve, reject) => {

        const sql = `
            UPDATE disponibilidad_coordinador
            SET
                dia_semana = ?,
                hora_inicio = ?,
                hora_fin = ?,
                duracion_cita = ?
            WHERE id_disponibilidad = ?
            AND coordinador_id = ?
        `;

        connection.query(
            sql,
            [
                datos.dia_semana,
                datos.hora_inicio,
                datos.hora_fin,
                datos.duracion_cita,
                id,
                coordinador_id
            ],
            (error, resultado) => {

                if (error) {
                    return reject(error);
                }

                resolve(resultado);

            }

        );

    });

}

function obtenerDisponibilidadPorId(id) {

    return new Promise((resolve, reject) => {

        connection.query(
            `
            SELECT *
            FROM disponibilidad_coordinador
            WHERE id_disponibilidad = ?
            `,
            [id],
            (error, results) => {

                if (error) {
                    return reject(error);
                }

                resolve(results[0]);

            }
        );

    });

}

function eliminarDisponibilidad(id) {

    return new Promise((resolve, reject) => {

        const sql = `
            UPDATE disponibilidad_coordinador
            SET activo = 0
            WHERE id_disponibilidad = ?
        `;

        connection.query(
            sql,
            [id],
            (error, resultado) => {

                if (error) {
                    return reject(error);
                }

                resolve(resultado);

            }
        );

    });

}

module.exports = {
    crearDisponibilidad,
    obtenerDisponibilidadPorCoordinador,
    existeCruceHorario,
    actualizarDisponibilidad,
    obtenerDisponibilidadPorId,
    eliminarDisponibilidad
};