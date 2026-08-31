const preguntasBotService =
    require('../services/preguntas-bot.service');

// CREAR PREGUNTA

async function crearPregunta(req, res) {

    try {

        const coordinador_id =
            req.usuario.id;

        const datos = {
            ...req.body,
            coordinador_id
        };

        const respuesta =
            await preguntasBotService.crearPregunta(
                datos
            );

        res.status(201).json(respuesta);

    }
    catch (error) {

        console.error(error);

        res.status(400).json({
            mensaje: error.message
        });

    }

}

// OBTENER PREGUNTAS DEL COORDINADOR

async function obtenerPreguntasPorCoordinador(
    req,
    res
) {

    try {

        const coordinador_id =
            req.usuario.id;

        const preguntas =
            await preguntasBotService
                .obtenerPreguntasPorCoordinador(
                    coordinador_id
                );

        res.json(preguntas);

    }
    catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: error.message
        });

    }

}

// ACTUALIZAR PREGUNTA

async function actualizarPregunta(
    req,
    res
) {

    try {

        const id_pregunta =
            req.params.id;

        const coordinador_id =
            req.usuario.id;

        const datos =
            req.body;

        const respuesta =
            await preguntasBotService
                .actualizarPregunta(
                    id_pregunta,
                    coordinador_id,
                    datos
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

// ACTIVAR / DESACTIVAR PREGUNTA

async function cambiarEstado(
    req,
    res
) {

    try {

        const id_pregunta =
            req.params.id;

        const coordinador_id =
            req.usuario.id;

        const { activo } =
            req.body;

        const respuesta =
            await preguntasBotService
                .cambiarEstado(
                    id_pregunta,
                    coordinador_id,
                    activo
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

// OBTENER PREGUNTAS ACTIVAS

async function obtenerPreguntasActivas(
    req,
    res
) {

    try {

        const area_id =
            req.query.area_id;

        const preguntas =
            await preguntasBotService
                .obtenerPreguntasActivas(
                    area_id
                );

        res.json(preguntas);

    }
    catch (error) {

        console.error(error);

        res.status(400).json({
            mensaje: error.message
        });

    }

}


module.exports = {

    crearPregunta,
    obtenerPreguntasPorCoordinador,
    actualizarPregunta,
    cambiarEstado,
    obtenerPreguntasActivas

};