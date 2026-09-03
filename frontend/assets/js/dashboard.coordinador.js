if (usuario.rol !== 'coordinador') {
    window.location.href = './login.html';
}

const logout = document.getElementById('logout');

logout.addEventListener('click', cerrarSesion);

function cerrarSesion() {

    localStorage.removeItem('usuario');

    localStorage.removeItem('token');

    window.location.href = './login.html';

}

async function cargarEstadisticas() {

    try {

        const datos = await api.get(
            `/estadisticas/coordinador/${usuario.id}`
        );

        console.log(datos);

        document.getElementById('total').textContent =
            datos.total || 0;

        document.getElementById('pendientes').textContent =
            datos.pendientes || 0;

        document.getElementById('aceptadas').textContent =
            datos.aceptadas || 0;

        document.getElementById('rechazadas').textContent =
            datos.rechazadas || 0;

    }
    catch (error) {

        console.error(error);

        alert(error.mensaje || error.message);

    }

}

cargarEstadisticas();

// ==========================================
// GOOGLE CALENDAR
// ==========================================

const btnGoogleCalendar =
    document.getElementById('btnGoogleCalendar');

const estadoGoogleCalendar =
    document.getElementById('estadoGoogleCalendar');


// CONECTAR GOOGLE CALENDAR

btnGoogleCalendar.addEventListener(
    'click',
    async () => {

        try {

            const respuesta =
                await api.get('/google-calendar/auth');

            console.log(
                'URL de autorización:',
                respuesta.url
            );

            window.location.href =
                respuesta.url;

        }
        catch (error) {

            console.error(
                'Error iniciando Google Calendar:',
                error
            );

            alert(
                error.mensaje ||
                'No fue posible iniciar la conexión con Google Calendar'
            );

        }

    }
);


// COMPROBAR CONEXIÓN

async function comprobarGoogleCalendar() {

    try {

        await api.get('/google-calendar/test');

        estadoGoogleCalendar.innerHTML = `
            <span class="text-success">
                <i class="bi bi-check-circle-fill"></i>
                Google Calendar está conectado correctamente.
            </span>
        `;

        btnGoogleCalendar.innerHTML = `
            <i class="bi bi-check-circle"></i>
            Google Calendar conectado
        `;

        btnGoogleCalendar.classList.remove(
            'btn-primary'
        );

        btnGoogleCalendar.classList.add(
            'btn-success'
        );

    }
    catch (error) {

        console.log(
            'Google Calendar no está conectado.'
        );

        estadoGoogleCalendar.innerHTML = `
            <span class="text-warning">
                <i class="bi bi-exclamation-circle"></i>
                Google Calendar no está conectado.
            </span>
        `;

        btnGoogleCalendar.innerHTML = `
            <i class="bi bi-google"></i>
            Conectar Google Calendar
        `;

    }

}


comprobarGoogleCalendar();