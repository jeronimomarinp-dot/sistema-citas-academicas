if (usuario.rol !== 'coordinador') {
    window.location.href = './login.html';
}

const logout = document.getElementById('logout');

logout.addEventListener('click', () => {

    localStorage.removeItem('usuario');

    window.location.href = './login.html';

});

async function cargarEstadisticas() {

    try {

        const response = await fetch(
            `http://localhost:3000/api/estadisticas/coordinador/${usuario.id}`
        );

        const datos = await response.json();

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

        console.log(error);

    }

}

cargarEstadisticas();