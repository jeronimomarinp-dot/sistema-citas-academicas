const citasModel = require('../models/citas.model');
const disponibilidadModel = require('../models/disponibilidad.model');
const googleCalendarService = require('./google-calendar.service');
const notificacionesService = require('./notificaciones.service');

async function crearCita(datos) {

    const {
        id_coordinador,
        fecha,
        hora
    } = datos;

    // 1. Validar que existan los datos básicos

    if (!id_coordinador || !fecha || !hora) {

        throw new Error(
            'El coordinador, la fecha y la hora son obligatorios.'
        );

    }

    // 2. Obtener el día de la semana

    const [anio, mes, dia] =
        fecha.split('-').map(Number);

    const fechaUTC =
        new Date(Date.UTC(anio, mes - 1, dia));

    const diasSemana = [
        'Domingo',
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado'
    ];

    const diaSemana =
        diasSemana[fechaUTC.getUTCDay()];

    // 3. Obtener disponibilidad del coordinador

    const disponibilidades =
        await disponibilidadModel.obtenerDisponibilidadPorCoordinador(
            id_coordinador
        );


    const horariosDelDia =
        disponibilidades.filter(
            disponibilidad =>
                disponibilidad.dia_semana === diaSemana
        );

    // 4. Verificar que tenga disponibilidad

    if (horariosDelDia.length === 0) {

        throw new Error(
            'El coordinador no tiene disponibilidad para este día.'
        );

    }

    // 5. Convertir horas a minutos
    function convertirMinutos(horaTexto) {

        const [horas, minutos] =
            horaTexto.substring(0, 5)
                .split(':')
                .map(Number);

        return (horas * 60) + minutos;

    }


    const minutosSolicitud =
        convertirMinutos(hora);

    // 6. Comprobar que la hora sea válida
    //    según disponibilidad y duración

    let horaValida = false;


    for (const disponibilidad of horariosDelDia) {

        const inicio =
            convertirMinutos(
                disponibilidad.hora_inicio
            );

        const fin =
            convertirMinutos(
                disponibilidad.hora_fin
            );

        const duracion =
            Number(
                disponibilidad.duracion_cita
            );


        if (!duracion || duracion <= 0) {
            continue;
        }


        // La hora debe estar dentro del horario
        if (
            minutosSolicitud < inicio ||
            minutosSolicitud >= fin
        ) {
            continue;
        }


        // La cita completa debe terminar
        // antes o exactamente al finalizar
        // la disponibilidad
        if (
            minutosSolicitud + duracion > fin
        ) {
            continue;
        }

        // La hora debe coincidir con uno
        // de los bloques generados
        const diferencia =
            minutosSolicitud - inicio;


        if (
            diferencia % duracion !== 0
        ) {
            continue;
        }


        horaValida = true;

        break;

    }

    // 7. Rechazar hora inválida

    if (!horaValida) {

        throw new Error(
            'La hora seleccionada no está disponible para este coordinador.'
        );

    }

    // 8. Verificar que no exista otra cita


    const citaExistente =
        await citasModel.existeCita(
            id_coordinador,
            fecha,
            hora
        );


    if (citaExistente) {

        throw new Error(
            'Esta hora ya está ocupada.'
        );

    }

    // 9. Crear la cita

    await citasModel.crearCita(datos);

    // 10. Notificar al coordinador

    try {

        await notificacionesService.crearNotificacion({

            usuario_id: id_coordinador,

            titulo: 'Nueva solicitud de cita',

            mensaje:
                `Tienes una nueva solicitud de cita para el día ${fecha} a las ${hora}.`,

            tipo: 'cita'

        });

    }
    catch (error) {

        console.error(
            'Error creando notificación:',
            error
        );

    }


    return {
        mensaje: 'Cita creada correctamente'
    };
}

async function obtenerCitasCoordinador(id_coordinador) {

    return await citasModel.obtenerCitasCoordinador(
        id_coordinador
    );

}


async function obtenerCitasEstudiante(id_estudiante) {

    return await citasModel.obtenerCitasEstudiante(
        id_estudiante
    );

}


async function actualizarEstado(
    idCita,
    estado,
    id_coordinador
) {

    // 1. Obtener la cita
    const cita =
        await citasModel.obtenerCitaPorId(
            idCita
        );

    // 2. Verificar que la cita exista
    if (!cita) {

        throw new Error(
            'La cita no existe.'
        );

    }

    // 3. Verificar que la cita pertenezca
    //    al coordinador autenticado
    if (
        Number(cita.id_coordinador) !==
        Number(id_coordinador)
    ) {

        throw new Error(
            'No tienes permiso para modificar esta cita.'
        );

    }

    // 4. Validar el estado recibido
    if (
        estado !== 'aceptada' &&
        estado !== 'rechazada'
    ) {

        throw new Error(
            'El estado de la cita no es válido.'
        );

    }

    // 5. Evitar procesar nuevamente
    //    una cita que ya fue aceptada/rechazada
    if (
        cita.estado === estado
    ) {

        throw new Error(
            'La cita ya tiene este estado.'
        );

    }

    // RECHAZAR CITA
    if (estado === 'rechazada') {

        await citasModel.actualizarEstado(
            idCita,
            'rechazada'
        );

        // Notificar al estudiante
        try {

            await notificacionesService.crearNotificacion({

                usuario_id: cita.id_estudiante,
                titulo: 'Cita rechazada',
                mensaje:
                    `Tu cita del día ${cita.fecha} a las ${cita.hora} ha sido rechazada.`,
                tipo: 'cancelacion'

            });

        }
        catch (error) {

            console.error(
                'Error creando notificación:',
                error
            );

        }


        return {

            mensaje:
                'Estado actualizado correctamente'

        };

    }

    // ACEPTAR CITA
    // 6. Obtener disponibilidades
    const disponibilidades =
        await disponibilidadModel
            .obtenerDisponibilidadPorCoordinador(
                cita.id_coordinador
            );

    // 7. Obtener duración de la cita
    const duracion =
        obtenerDuracionCita(
            disponibilidades,
            cita.fecha,
            cita.hora
        );

    // 8. Construir fecha de inicio y final
    const fechas =
        googleCalendarService
            .construirFechasEvento(
                cita.fecha,
                cita.hora,
                duracion
            );

    // 9. Crear evento en Google Calendar
    const evento =
        await googleCalendarService
            .crearEventoGoogle(
                cita.id_coordinador,
                {
                    titulo:
                        `Cita académica - ${cita.estudiante}`,

                    descripcion:
                        cita.motivo ||
                        'Cita académica',

                    inicio:
                        fechas.inicio,

                    fin:
                        fechas.fin
                }
            );

    // 10. Si Google Calendar creó
    //     correctamente el evento,
    //     actualizar la cita
    await citasModel.actualizarEstado(
        idCita,
        'aceptada'
    );


    // Notificar al estudiante

    try {

        await notificacionesService.crearNotificacion({

            usuario_id: cita.id_estudiante,

            titulo: 'Cita aceptada',

            mensaje:
                `Tu cita del día ${cita.fecha} a las ${cita.hora} ha sido aceptada y agregada a Google Calendar.`,

            tipo: 'cita'

        });

    }
    catch (error) {

        console.error(
            'Error creando notificación:',
            error
        );

    }


    return {

        mensaje:
            'Cita aceptada y agregada a Google Calendar',

        google_event_id:
            evento.id,

        enlace:
            evento.htmlLink

    };
}

async function obtenerCitasPorCoordinadorFecha(
    id_coordinador,
    fecha
) {

    return await citasModel.obtenerCitasPorCoordinadorFecha(
        id_coordinador,
        fecha
    );

}

function obtenerDuracionCita(
    disponibilidades,
    fecha,
    hora
) {

    const [anio, mes, dia] =
        fecha.split('-').map(Number);

    const fechaUTC =
        new Date(
            Date.UTC(
                anio,
                mes - 1,
                dia
            )
        );

    const diasSemana = [
        'Domingo',
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado'
    ];

    const diaSemana =
        diasSemana[
        fechaUTC.getUTCDay()
        ];

    function convertirMinutos(horaTexto) {

        const [horas, minutos] =
            horaTexto
                .substring(0, 5)
                .split(':')
                .map(Number);

        return (
            horas * 60
        ) + minutos;

    }

    const minutosSolicitud =
        convertirMinutos(hora);

    const disponibilidad =
        disponibilidades.find(
            disponibilidad => {

                if (
                    disponibilidad.dia_semana !==
                    diaSemana
                ) {
                    return false;
                }

                const inicio =
                    convertirMinutos(
                        disponibilidad.hora_inicio
                    );

                const fin =
                    convertirMinutos(
                        disponibilidad.hora_fin
                    );

                return (
                    minutosSolicitud >= inicio &&
                    minutosSolicitud < fin
                );

            }
        );

    if (!disponibilidad) {

        throw new Error(
            'No se encontró la disponibilidad correspondiente a la cita.'
        );

    }

    const duracion =
        Number(
            disponibilidad.duracion_cita
        );

    if (
        !duracion ||
        duracion <= 0
    ) {

        throw new Error(
            'La duración de la cita no es válida.'
        );

    }

    return duracion;

}

async function obtenerHorasOcupadas(id_coordinador, fecha) {

    return await citasModel.obtenerHorasOcupadas(
        id_coordinador,
        fecha
    );

}

module.exports = {
    crearCita,
    obtenerCitasCoordinador,
    obtenerCitasEstudiante,
    actualizarEstado,
    obtenerCitasPorCoordinadorFecha,
    obtenerDuracionCita,
    obtenerHorasOcupadas
};