// Variables Globales
window.usuario;

if (!usuario || usuario.rol !== 'coordinador') {

    window.location.href = './login.html';

}

const logout = document.getElementById('logout');

const btnAgregar = document.getElementById('btnAgregar');

const btnGuardar = document.getElementById('btnGuardar');

const tablaDisponibilidad =
    document.getElementById('tablaDisponibilidad');

const horasDisponibles =
    document.getElementById('horasDisponibles');

const duracionPromedio =
    document.getElementById('duracionPromedio');

const modalDisponibilidad = new bootstrap.Modal(
    document.getElementById('modalDisponibilidad')
);

// Eventos

logout.addEventListener('click', cerrarSesion);

btnAgregar.addEventListener('click', abrirModalAgregar);

cargarDisponibilidad();

// Funciones

function cerrarSesion() {

    localStorage.removeItem('usuario');

    window.location.href = './login.html';

}

function abrirModalAgregar() {

    document.getElementById('tituloModal').textContent =
        'Agregar Horario';

    document.getElementById('formDisponibilidad').reset();

    document.getElementById('idDisponibilidad').value = '';

    modalDisponibilidad.show();

}

async function cargarDisponibilidad() {

    try {

        const horarios = await api.get('/disponibilidad');

        console.log(horarios);

    } catch (error) {

        console.error(error);

    }

}