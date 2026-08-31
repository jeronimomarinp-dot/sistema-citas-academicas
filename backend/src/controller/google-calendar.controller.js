const jwt = require('jsonwebtoken');
const googleCalendarService = require('../services/google-calendar.service');
const crearOAuth2Client = require('../config/google-calendar');

const generarAutorizacion = (req, res) => {

    const state = jwt.sign(
        {
            id: req.usuario.id,
            rol: req.usuario.rol
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '10m'
        }
    );

    const oauth2Client =
        crearOAuth2Client();

    const url = oauth2Client.generateAuthUrl({

        access_type: 'offline',

        scope: [
            'https://www.googleapis.com/auth/calendar.events.owned'
        ],

        prompt: 'consent',

        state: state

    });

    res.json({
        url
    });

};

const procesarCallback = async (req, res) => {

    try {

        const { code, state } = req.query;

        if (!code || !state) {

            return res.status(400).json({
                mensaje: 'Código o state no recibido'
            });

        }

        const datosState = jwt.verify(
            state,
            process.env.JWT_SECRET
        );

        if (datosState.rol !== 'coordinador') {

            return res.status(403).json({
                mensaje: 'El usuario no es un coordinador'
            });

        }

        const oauth2Client =
            crearOAuth2Client();

        const { tokens } =
            await oauth2Client.getToken(code);

        oauth2Client.setCredentials(tokens);

        await googleCalendarService.guardarTokensGoogle(
            datosState.id,
            tokens
        );

        return res.json({
            mensaje: 'Google Calendar autorizado correctamente',
            id_coordinador: datosState.id
        });

    } catch (error) {

        console.error(
            'Error en callback de Google Calendar:',
            error
        );

        return res.status(500).json({
            mensaje: 'Error al autorizar Google Calendar'
        });

    }

};

const probarConexion = async (req, res) => {

    try {

        const eventos =
            await googleCalendarService.probarConexionGoogle(
                req.usuario.id
            );

        return res.json({
            mensaje: 'Conexión con Google Calendar correcta',
            cantidad_eventos: eventos.length,
            eventos: eventos
        });

    } catch (error) {

        console.error(
            'Error probando Google Calendar:',
            error
        );

        return res.status(500).json({
            mensaje: 'No fue posible conectar con Google Calendar'
        });

    }

};

const crearEventoPrueba = async (req, res) => {

    try {

        const datosEvento = {

            titulo:
                'PRUEBA - Sistema de Citas Académicas',

            descripcion:
                'Evento de prueba de integración con Google Calendar',

            inicio:
                '2026-08-29T10:00:00',

            fin:
                '2026-08-29T10:30:00'

        };

        const evento =
            await googleCalendarService.crearEventoGoogle(
                req.usuario.id,
                datosEvento
            );

        return res.json({

            mensaje:
                'Evento creado correctamente en Google Calendar',

            google_event_id:
                evento.id,

            enlace:
                evento.htmlLink

        });

    }
    catch (error) {

        console.error(
            'Error creando evento de prueba:',
            error
        );

        return res.status(500).json({

            mensaje:
                'No fue posible crear el evento en Google Calendar'

        });

    }

};

module.exports = {
    generarAutorizacion,
    procesarCallback,
    probarConexion,
    crearEventoPrueba
};