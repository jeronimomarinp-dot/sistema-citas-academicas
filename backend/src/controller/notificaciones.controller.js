const notificacionesService =
    require('../services/notificaciones.service');

// OBTENER NOTIFICACIONES

async function obtenerNotificaciones(req, res) {

    try {

        const id_usuario =
            req.usuario.id;

        const notificaciones =
            await notificacionesService.obtenerNotificaciones(
                id_usuario
            );

        res.json(notificaciones);

    }
    catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: error.message
        });

    }

}

// MARCAR NOTIFICACIÓN COMO LEÍDA

async function marcarComoLeida(req, res) {

    try {

        const id_notificacion =
            req.params.id;

        const id_usuario =
            req.usuario.id;

        const respuesta =
            await notificacionesService.marcarComoLeida(
                id_notificacion,
                id_usuario
            );

        res.json(respuesta);

    }
    catch (error) {

        console.error(error);

        res.status(400).json({
            mensaje: error.message
        });

    }

}


module.exports = {
    obtenerNotificaciones,
    marcarComoLeida
};