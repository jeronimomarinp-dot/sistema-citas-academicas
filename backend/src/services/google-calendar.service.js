const googleCalendarModel =
    require('../models/google-calendar.model');

const crearOAuth2Client =
    require('../config/google-calendar');

const guardarTokensGoogle = async (
    id_usuario,
    tokens
) => {

    const token_expira = tokens.expiry_date
        ? new Date(tokens.expiry_date)
        : null;

    await googleCalendarModel.guardarTokens(
        id_usuario,
        tokens.access_token,
        tokens.refresh_token,
        token_expira,
        tokens.scope,
        tokens.token_type
    );

};

const obtenerTokensGoogle = async (id_usuario) => {

    return await googleCalendarModel.obtenerTokens(
        id_usuario
    );

};

const obtenerClienteAutenticado = async (id_usuario) => {

    const tokens =
        await obtenerTokensGoogle(id_usuario);

    if (!tokens) {

        throw new Error(
            'El coordinador no tiene Google Calendar conectado'
        );

    }

    const oauth2Client =
        crearOAuth2Client();

    oauth2Client.setCredentials({

        access_token:
            tokens.access_token,

        refresh_token:
            tokens.refresh_token,

        expiry_date:
            tokens.token_expira
                ? new Date(tokens.token_expira).getTime()
                : undefined,

        scope:
            tokens.scope,

        token_type:
            tokens.token_type

    });

    return oauth2Client;
};

const probarConexionGoogle = async (id_usuario) => {

    const cliente =
        await obtenerClienteAutenticado(id_usuario);

    const { google } = require('googleapis');

    const calendar = google.calendar({
        version: 'v3',
        auth: cliente
    });

    const respuesta = await calendar.events.list({
        calendarId: 'primary',
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime'
    });

    return respuesta.data.items;
};

const construirFechasEvento = (
    fecha,
    hora,
    duracion
) => {

    const horaInicio =
        hora.substring(0, 5);

    const [horas, minutos] =
        horaInicio
            .split(':')
            .map(Number);

    const inicio =
        new Date(
            `${fecha}T${horaInicio}:00-05:00`
        );

    if (isNaN(inicio.getTime())) {

        throw new Error(
            'La fecha o la hora de la cita no son válidas.'
        );

    }

    const fin =
        new Date(
            inicio.getTime() +
            (duracion * 60 * 1000)
        );

    const formatearFecha =
        (fechaObjeto) => {

            const año =
                fechaObjeto.getFullYear();

            const mes =
                String(
                    fechaObjeto.getMonth() + 1
                ).padStart(2, '0');

            const dia =
                String(
                    fechaObjeto.getDate()
                ).padStart(2, '0');

            const horas =
                String(
                    fechaObjeto.getHours()
                ).padStart(2, '0');

            const minutos =
                String(
                    fechaObjeto.getMinutes()
                ).padStart(2, '0');

            const segundos =
                String(
                    fechaObjeto.getSeconds()
                ).padStart(2, '0');

            return `${año}-${mes}-${dia}T${horas}:${minutos}:${segundos}`;
        };

    return {

        inicio:
            formatearFecha(inicio),

        fin:
            formatearFecha(fin)

    };

};

const crearEventoGoogle = async (
    id_usuario,
    datosEvento
) => {

    const cliente =
        await obtenerClienteAutenticado(id_usuario);

    const { google } =
        require('googleapis');

    const calendar =
        google.calendar({
            version: 'v3',
            auth: cliente
        });

    const evento = {
        summary: datosEvento.titulo,

        description:
            datosEvento.descripcion,

        start: {
            dateTime: datosEvento.inicio,
            timeZone: 'America/Bogota'
        },

        end: {
            dateTime: datosEvento.fin,
            timeZone: 'America/Bogota'
        }
    };

    const respuesta =
        await calendar.events.insert({

            calendarId: 'primary',

            resource: evento

        });

    return respuesta.data;

};

module.exports = {
    guardarTokensGoogle,
    obtenerTokensGoogle,
    obtenerClienteAutenticado,
    probarConexionGoogle,
    construirFechasEvento,
    crearEventoGoogle
};