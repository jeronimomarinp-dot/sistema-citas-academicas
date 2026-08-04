if (usuario.rol !== 'estudiante') {
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
            `http://localhost:3000/api/estadisticas/estudiante/${usuario.id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        );

        const datos = await response.json();

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

        console.log(error);

    }

}

cargarEstadisticas();