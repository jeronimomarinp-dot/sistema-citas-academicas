const notificacionesModel =
    require('../models/notificaciones.model');

// CREAR NOTIFICACIÓN

async function crearNotificacion(datos) {

    if (!datos.usuario_id) {

        throw new Error(
            'El usuario de la notificación es obligatorio.'
        );

    }

    if (!datos.titulo) {

        throw new Error(
            'El título de la notificación es obligatorio.'
        );

    }

    if (!datos.mensaje) {

        throw new Error(
            'El mensaje de la notificación es obligatorio.'
        );

    }

    if (!datos.tipo) {

        throw new Error(
            'El tipo de notificación es obligatorio.'
        );

    }

    const tiposPermitidos = [
        'cita',
        'recordatorio',
        'cancelacion',
        'otro'
    ];

    if (!tiposPermitidos.includes(datos.tipo)) {

        throw new Error(
            'El tipo de notificación no es válido.'
        );

    }

    await notificacionesModel.crearNotificacion(
        datos
    );

    return {
        mensaje: 'Notificación creada correctamente.'
    };

}

// OBTENER NOTIFICACIONES

async function obtenerNotificaciones(usuario_id) {

    if (!usuario_id) {

        throw new Error(
            'El usuario es obligatorio.'
        );

    }

    return await notificacionesModel
        .obtenerNotificacionesPorUsuario(
            usuario_id
        );

}

// MARCAR COMO LEÍDA

async function marcarComoLeida(
    id_notificacion,
    usuario_id
) {

    if (!id_notificacion) {

        throw new Error(
            'La notificación es obligatoria.'
        );

    }

    if (!usuario_id) {

        throw new Error(
            'El usuario es obligatorio.'
        );

    }

    const resultado =
        await notificacionesModel.marcarComoLeida(
            id_notificacion,
            usuario_id
        );

    if (resultado.affectedRows === 0) {

        throw new Error(
            'La notificación no existe o no pertenece al usuario.'
        );

    }

    return {
        mensaje:
            'Notificación marcada como leída.'
    };

}

// OBTENER NO LEÍDAS

async function obtenerNotificacionesNoLeidas(
    usuario_id
) {

    if (!usuario_id) {

        throw new Error(
            'El usuario es obligatorio.'
        );

    }

    return await notificacionesModel
        .obtenerNotificacionesNoLeidas(
            usuario_id
        );

}


module.exports = {
    crearNotificacion,
    obtenerNotificaciones,
    marcarComoLeida,
    obtenerNotificacionesNoLeidas
};