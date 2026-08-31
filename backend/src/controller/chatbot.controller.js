const chatbotService =
    require('../services/chatbot.service');


// RESPONDER PREGUNTA DEL CHATBOT

async function responderPregunta(req, res) {

    try {

        const {
            pregunta,
            area_id
        } = req.body;


        const resultado =
            await chatbotService.responderPregunta(
                pregunta,
                area_id
            );


        res.json(resultado);

    }
    catch (error) {

        console.error(error);


        res.status(400).json({

            mensaje:
                error.message

        });

    }

}


module.exports = {

    responderPregunta

};