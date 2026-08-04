const disponibilidadService = require('../services/disponibilidad.service');

async function crearDisponibilidad(req, res) {

    try {

        const coordinador_id = req.usuario.id;

        const datos = {
            coordinador_id,
            ...req.body
        };

        const respuesta = await disponibilidadService.crearDisponibilidad(datos);

        res.status(201).json(respuesta);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: error.message
        });

    }

}

async function obtenerDisponibilidad(req, res) {

    try {

        const coordinador_id = req.usuario.id;

        const disponibilidad = await disponibilidadService.obtenerDisponibilidad(
            coordinador_id
        );

        res.json(disponibilidad);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: 'Error obteniendo disponibilidad'
        });

    }

}

async function actualizarDisponibilidad(req, res) {

    try {

        const id = req.params.id;

        const coordinador_id = req.usuario.id;

        const respuesta =
            await disponibilidadService.actualizarDisponibilidad(

                id,
                coordinador_id,
                req.body

            );

        res.json(respuesta);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: error.message
        });

    }

}

async function eliminarDisponibilidad(req, res) {

    try {

        const { id } = req.params;

        const respuesta = await disponibilidadService.eliminarDisponibilidad(id);

        res.json(respuesta);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: error.message
        });

    }

}

module.exports = {
    crearDisponibilidad,
    obtenerDisponibilidad,
    actualizarDisponibilidad,
    eliminarDisponibilidad
};