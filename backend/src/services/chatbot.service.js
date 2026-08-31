const preguntasBotModel =
    require('../models/preguntas-bot.model');


// NORMALIZAR TEXTO

function normalizarTexto(texto) {

    return texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[¿?¡!.,;:]/g, '')
        .replace(/\s+/g, ' ')
        .trim();

}


// GRUPOS DE PALABRAS SIMILARES

const gruposSimilares = [

    ['horario', 'horarios', 'hora', 'horas'],

    ['atencion', 'atender', 'atiende', 'atienden'],

    ['cita', 'citas'],

    ['agendar', 'agenda', 'agendamiento'],

    ['cancelar', 'cancelacion', 'cancelada', 'cancelado'],

    ['aceptar', 'aceptada', 'aceptado'],

    ['rechazar', 'rechazada', 'rechazado']

];


// COMPROBAR SI DOS PALABRAS SON SIMILARES

function palabrasSimilares(
    palabra1,
    palabra2
) {

    if (palabra1 === palabra2) {

        return true;

    }


    for (const grupo of gruposSimilares) {

        if (
            grupo.includes(palabra1) &&
            grupo.includes(palabra2)
        ) {

            return true;

        }

    }


    return false;

}


// OBTENER PALABRAS IMPORTANTES

function obtenerPalabrasImportantes(texto) {

    const palabrasIgnoradas = [

        'el',
        'la',
        'los',
        'las',

        'un',
        'una',
        'unos',
        'unas',

        'de',
        'del',
        'en',
        'para',
        'por',
        'con',

        'que',
        'cual',
        'cuales',

        'es',
        'son',

        'me',
        'se',

        'mi',
        'tu',

        'hay',

        'como',

        'donde',
        'cuando',

        // FORMAS COMUNES DE HACER UNA PREGUNTA

        'puede',
        'puedo',
        'pueden',

        'decir',
        'dime',

        'saber',

        'informar',
        'informarme',

        'favor',

        'quisiera',
        'quiero'

    ];


    return normalizarTexto(texto)
        .split(' ')
        .filter(palabra =>
            palabra.length > 2 &&
            !palabrasIgnoradas.includes(palabra)
        );

}


// CALCULAR COINCIDENCIA

function calcularCoincidencia(
    preguntaUsuario,
    preguntaRegistrada
) {

    const palabrasUsuario =
        obtenerPalabrasImportantes(
            preguntaUsuario
        );


    const palabrasRegistradas =
        obtenerPalabrasImportantes(
            preguntaRegistrada
        );


    if (
        palabrasUsuario.length === 0 ||
        palabrasRegistradas.length === 0
    ) {

        return 0;

    }


    let coincidencias = 0;


    palabrasUsuario.forEach(
        palabraUsuario => {

            const coincide =
                palabrasRegistradas.some(
                    palabraRegistrada =>
                        palabrasSimilares(
                            palabraUsuario,
                            palabraRegistrada
                        )
                );


            if (coincide) {

                coincidencias++;

            }

        }
    );


    return coincidencias /
        palabrasUsuario.length;

}


// RESPONDER PREGUNTA

async function responderPregunta(
    pregunta,
    area_id
) {

    if (!pregunta || !pregunta.trim()) {

        throw new Error(
            'La pregunta es obligatoria.'
        );

    }


    if (!area_id) {

        throw new Error(
            'El área académica es obligatoria.'
        );

    }


    const preguntas =
        await preguntasBotModel
            .obtenerPreguntasActivas(
                area_id
            );


    if (
        !preguntas ||
        preguntas.length === 0
    ) {

        return {

            encontrada: false,

            respuesta:
                'No hay información disponible para esta área académica.'

        };

    }


    let mejorPregunta = null;

    let mejorCoincidencia = 0;


    preguntas.forEach(item => {

        const coincidencia =
            calcularCoincidencia(
                pregunta,
                item.pregunta
            );


        if (
            coincidencia >
            mejorCoincidencia
        ) {

            mejorCoincidencia =
                coincidencia;

            mejorPregunta =
                item;

        }

    });


    /*
        Exigimos al menos un 40% de coincidencia.

        Esto evita que una pregunta completamente
        diferente reciba una respuesta incorrecta.
    */

    if (
        !mejorPregunta ||
        mejorCoincidencia < 0.4
    ) {

        return {

            encontrada: false,

            respuesta:
                'No encontré una respuesta para tu pregunta. Intenta formularla de otra manera.'

        };

    }


    return {

        encontrada: true,

        respuesta:
            mejorPregunta.respuesta,

        id_pregunta:
            mejorPregunta.id_pregunta

    };

}


module.exports = {

    responderPregunta

};