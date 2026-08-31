const connection = require('../config/db');

// CREAR NOTIFICACIÓN

function crearNotificacion(datos) {

    return new Promise((resolve, reject) => {

        const sql = `
            INSERT INTO notificaciones
            (
                usuario_id,
                titulo,
                mensaje,
                tipo
            )
            VALUES (?, ?, ?, ?)
        `;

        connection.query(
            sql,
            [
                datos.usuario_id,
                datos.titulo,
                datos.mensaje,
                datos.tipo
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

// OBTENER NOTIFICACIONES DE UN USUARIO

function obtenerNotificacionesPorUsuario(usuario_id) {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT
                id_notificacion,
                usuario_id,
                titulo,
                mensaje,
                tipo,
                leida,
                fecha_envio
            FROM notificaciones
            WHERE usuario_id = ?
            ORDER BY fecha_envio DESC
        `;

        connection.query(
            sql,
            [usuario_id],
            (error, results) => {

                if (error) {
                    return reject(error);
                }

                resolve(results);

            }
        );

    });

}

// MARCAR NOTIFICACIÓN COMO LEÍDA

function marcarComoLeida(id_notificacion, usuario_id) {

    return new Promise((resolve, reject) => {

        const sql = `
            UPDATE notificaciones
            SET leida = 1
            WHERE id_notificacion = ?
            AND usuario_id = ?
        `;

        connection.query(
            sql,
            [
                id_notificacion,
                usuario_id
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

// OBTENER NOTIFICACIONES NO LEÍDAS

function obtenerNotificacionesNoLeidas(usuario_id) {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT
                id_notificacion,
                usuario_id,
                titulo,
                mensaje,
                tipo,
                leida,
                fecha_envio
            FROM notificaciones
            WHERE usuario_id = ?
            AND leida = 0
            ORDER BY fecha_envio DESC
        `;

        connection.query(
            sql,
            [usuario_id],
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
    crearNotificacion,
    obtenerNotificacionesPorUsuario,
    marcarComoLeida,
    obtenerNotificacionesNoLeidas
};