if (usuario.rol !== 'estudiante') {
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
            `/estadisticas/estudiante/${usuario.id}`
        );

        document.getElementById('pendientes').textContent =
            datos.pendientes || 0;

        document.getElementById('aceptadas').textContent =
            datos.aceptadas || 0;

        document.getElementById('rechazadas').textContent =
            datos.rechazadas || 0;

        document.getElementById('total').textContent =
            datos.total || 0;

    }
    catch (error) {

        console.error(error);

        alert(error.mensaje || error.message);

    }

}

cargarEstadisticas();