const disponibilidadModel = require('../models/disponibilidad.model');

async function crearDisponibilidad(datos) {

    const {
        hora_inicio,
        hora_fin
    } = datos;

    if (hora_inicio >= hora_fin) {

        throw new Error(
            'La hora de inicio debe ser menor que la hora de fin.'
        );

    }

    const horariosExistentes = await disponibilidadModel.existeCruceHorario(datos);

    if (horariosExistentes.length > 0) {

        throw new Error(
            'Ya existe un horario registrado que se cruza con este.'
        );

    }

    await disponibilidadModel.crearDisponibilidad(datos);

    return {
        mensaje: 'Disponibilidad registrada correctamente.'
    };

}

async function obtenerDisponibilidad(coordinador_id) {

    return await disponibilidadModel.obtenerDisponibilidadPorCoordinador(coordinador_id);

}

async function actualizarDisponibilidad(id, coordinador_id, datos) {

    const {
        hora_inicio,
        hora_fin
    } = datos;

    if (hora_inicio >= hora_fin) {

        throw new Error(
            'La hora de inicio debe ser menor que la hora de fin.'
        );

    }

    const existeCruce =
    await disponibilidadModel.existeCruceHorario({
        coordinador_id,
        dia_semana: datos.dia_semana,
        hora_inicio,
        hora_fin,
        id_excluir: id
    });

    if (existeCruce.length > 0) {

        throw new Error(
            'Ya existe un horario registrado que se cruza con este.'
        );

    }

    await disponibilidadModel.actualizarDisponibilidad(
        id,
        coordinador_id,
        datos
    );

    return {
        mensaje: 'Disponibilidad actualizada correctamente.'
    };

}

async function actualizarEstadoDisponibilidad(id, estado) {

    await disponibilidadModel.actualizarEstadoDisponibilidad(
        id,
        estado
    );

    return {
        mensaje: 'Estado actualizado correctamente.'
    };

}

async function eliminarDisponibilidad(id) {

    await disponibilidadModel.eliminarDisponibilidad(id);

    return {
        mensaje: 'Disponibilidad eliminada correctamente.'
    };

}

async function obtenerDisponibilidadCoordinador(coordinador_id) {

    return await disponibilidadModel.obtenerDisponibilidadPorCoordinador(
        coordinador_id
    );

}

module.exports = {
    crearDisponibilidad,
    obtenerDisponibilidad,
    actualizarDisponibilidad,
    actualizarEstadoDisponibilidad,
    eliminarDisponibilidad,
    obtenerDisponibilidadCoordinador
};