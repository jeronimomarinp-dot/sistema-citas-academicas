const preguntasBotModel =
    require('../models/preguntas-bot.model');

// CREAR PREGUNTA

async function crearPregunta(datos) {

    // Validar coordinador

    if (!datos.coordinador_id) {

        throw new Error(
            'El coordinador es obligatorio.'
        );

    }


    // Validar pregunta

    if (!datos.pregunta ||
        !datos.pregunta.trim()) {

        throw new Error(
            'La pregunta es obligatoria.'
        );

    }


    // Validar respuesta

    if (!datos.respuesta ||
        !datos.respuesta.trim()) {

        throw new Error(
            'La respuesta es obligatoria.'
        );

    }


    // Validar área

    if (!datos.area_id) {

        throw new Error(
            'El área académica es obligatoria.'
        );

    }


    await preguntasBotModel.crearPregunta(
        datos
    );


    return {
        mensaje:
            'Pregunta del bot creada correctamente.'
    };

}

// OBTENER PREGUNTAS DEL COORDINADOR

async function obtenerPreguntasPorCoordinador(
    coordinador_id
) {

    if (!coordinador_id) {

        throw new Error(
            'El coordinador es obligatorio.'
        );

    }


    return await preguntasBotModel
        .obtenerPreguntasPorCoordinador(
            coordinador_id
        );

}

// ACTUALIZAR PREGUNTA

async function actualizarPregunta(
    id_pregunta,
    coordinador_id,
    datos
) {

    if (!id_pregunta) {

        throw new Error(
            'La pregunta es obligatoria.'
        );

    }


    if (!coordinador_id) {

        throw new Error(
            'El coordinador es obligatorio.'
        );

    }


    if (!datos.pregunta ||
        !datos.pregunta.trim()) {

        throw new Error(
            'La pregunta es obligatoria.'
        );

    }


    if (!datos.respuesta ||
        !datos.respuesta.trim()) {

        throw new Error(
            'La respuesta es obligatoria.'
        );

    }


    if (!datos.area_id) {

        throw new Error(
            'El área académica es obligatoria.'
        );

    }


    const resultado =
        await preguntasBotModel.actualizarPregunta(
            id_pregunta,
            coordinador_id,
            datos
        );


    if (resultado.affectedRows === 0) {

        throw new Error(
            'La pregunta no existe o no pertenece al coordinador.'
        );

    }


    return {
        mensaje:
            'Pregunta del bot actualizada correctamente.'
    };

}

// ACTIVAR / DESACTIVAR PREGUNTA

async function cambiarEstado(
    id_pregunta,
    coordinador_id,
    activo
) {

    if (!id_pregunta) {

        throw new Error(
            'La pregunta es obligatoria.'
        );

    }


    if (!coordinador_id) {

        throw new Error(
            'El coordinador es obligatorio.'
        );

    }


    if (
        activo !== 0 &&
        activo !== 1 &&
        activo !== false &&
        activo !== true
    ) {

        throw new Error(
            'El estado de la pregunta no es válido.'
        );

    }


    const resultado =
        await preguntasBotModel.cambiarEstado(
            id_pregunta,
            coordinador_id,
            activo ? 1 : 0
        );


    if (resultado.affectedRows === 0) {

        throw new Error(
            'La pregunta no existe o no pertenece al coordinador.'
        );

    }


    return {
        mensaje:
            activo
                ? 'Pregunta activada correctamente.'
                : 'Pregunta desactivada correctamente.'
    };

}

// OBTENER PREGUNTAS ACTIVAS

async function obtenerPreguntasActivas(
    area_id
) {

    if (!area_id) {

        throw new Error(
            'El área académica es obligatoria.'
        );

    }


    return await preguntasBotModel
        .obtenerPreguntasActivas(
            area_id
        );

}


module.exports = {

    crearPregunta,

    obtenerPreguntasPorCoordinador,

    actualizarPregunta,

    cambiarEstado,

    obtenerPreguntasActivas

};