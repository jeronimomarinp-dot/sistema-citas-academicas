const usuarioChatbot = JSON.parse(
    localStorage.getItem('usuario')
);

console.log('Usuario:', usuarioChatbot);
console.log('Area ID:', usuarioChatbot.area_id);
const chatbotForm =
    document.getElementById('chatbotForm');
const preguntaInput =
    document.getElementById('pregunta');
const chat =
    document.getElementById('chat');


// VERIFICAR USUARIO

if (!usuarioChatbot) {

    window.location.href = './login.html';

}


// MOSTRAR MENSAJE EN EL CHAT

function agregarMensaje(
    mensaje,
    tipo
) {

    const contenedor =
        document.createElement('div');

    contenedor.classList.add(
        'mb-3'
    );


    if (tipo === 'usuario') {

        contenedor.classList.add(
            'text-end'
        );

        contenedor.innerHTML = `
            <div>
                <strong>Tú:</strong>
                <div>${mensaje}</div>
            </div>
        `;

    }
    else {

        contenedor.innerHTML = `
            <div>
                <strong>Asistente:</strong>
                <div>${mensaje}</div>
            </div>
        `;

    }


    chat.appendChild(
        contenedor
    );


    chat.scrollTop =
        chat.scrollHeight;

}


// ENVIAR PREGUNTA

chatbotForm.addEventListener(
    'submit',
    async (e) => {

        e.preventDefault();


        const pregunta =
            preguntaInput.value.trim();


        if (!pregunta) {

            return;

        }


        // MOSTRAR PREGUNTA DEL ESTUDIANTE

        agregarMensaje(
            pregunta,
            'usuario'
        );


        // LIMPIAR INPUT

        preguntaInput.value = '';


        try {

            const resultado =
                await api.post(
                    '/chatbot/preguntar',
                    {
                        pregunta,
                        area_id:
                            usuarioChatbot.area_id
                    }
                );


            agregarMensaje(
                resultado.respuesta,
                'bot'
            );

        }
        catch (error) {

            console.error(error);

            agregarMensaje(
                error.mensaje ||
                'Ocurrió un error al procesar tu pregunta.',
                'bot'
            );

        }

    }
);