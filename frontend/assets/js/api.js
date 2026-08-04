const API_URL = 'http://localhost:3000/api';

function obtenerToken() {

    return localStorage.getItem('token');

}

async function peticion(endpoint, opciones = {}) {

    const token = obtenerToken();

    const configuracion = {

        headers: {
            'Content-Type': 'application/json',
            ...(token && {
                Authorization: `Bearer ${token}`
            }),
            ...opciones.headers
        },

        ...opciones

    };

    const respuesta = await fetch(
        `${API_URL}${endpoint}`,
        configuracion
    );

    const datos = await respuesta.json();

    if (!respuesta.ok) {

        throw datos;

    }

    return datos;

}

const api = {

    get(endpoint) {

        return peticion(endpoint);

    },

    post(endpoint, body) {

        return peticion(endpoint, {

            method: 'POST',

            body: JSON.stringify(body)

        });

    },

    put(endpoint, body) {

        return peticion(endpoint, {

            method: 'PUT',

            body: JSON.stringify(body)

        });

    },

    delete(endpoint) {

        return peticion(endpoint, {

            method: 'DELETE'

        });

    }

};