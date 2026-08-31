const citasService = require('../services/citas.service');

async function crearCita(req, res) {

    try {

        const id_estudiante = req.usuario.id;

        const datos = {
            id_estudiante,
            ...req.body
        };

        const respuesta =
            await citasService.crearCita(datos);

        res.status(201).json(respuesta);

    }
    catch (error) {

        console.error(error);

        res.status(400).json({
            mensaje: error.message
        });

    }

}


async function obtenerCitasCoordinador(req, res) {

    try {

        const id_coordinador =
            req.usuario.id;

        const citas =
            await citasService.obtenerCitasCoordinador(
                id_coordinador
            );

        res.json(citas);

    }
    catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: error.message
        });

    }

}


async function obtenerCitasEstudiante(req, res) {

    try {

        const id_estudiante =
            req.usuario.id;

        const citas =
            await citasService.obtenerCitasEstudiante(
                id_estudiante
            );

        res.json(citas);

    }
    catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: error.message
        });

    }

}


async function actualizarEstado(req, res) {

    try {

        const idCita =
            req.params.id;

        const { estado } =
            req.body;

        const id_coordinador =
            req.usuario.id;

        const respuesta =
            await citasService.actualizarEstado(
                idCita,
                estado,
                id_coordinador
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

async function obtenerCitasPorCoordinadorFecha(req, res) {

    try {

        const id_coordinador =
            req.params.id;

        const fecha =
            req.params.fecha;

        const citas =
            await citasService.obtenerCitasPorCoordinadorFecha(
                id_coordinador,
                fecha
            );

        res.json(citas);

    }
    catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: error.message
        });

    }

}

async function obtenerHorasOcupadas(req, res) {

    try {

        const id_coordinador =
            req.params.id;

        const fecha =
            req.query.fecha;

        const horas =
            await citasService.obtenerHorasOcupadas(
                id_coordinador,
                fecha
            );

        res.json(horas);

    }
    catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: error.message
        });

    }

}

module.exports = {
    crearCita,
    obtenerCitasCoordinador,
    obtenerCitasEstudiante,
    actualizarEstado,
    obtenerCitasPorCoordinadorFecha,
    obtenerHorasOcupadas
};