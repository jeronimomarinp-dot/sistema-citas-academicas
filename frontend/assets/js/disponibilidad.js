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

btnGuardar.addEventListener('click', guardarHorario);

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

        const tabla =
            document.getElementById('tablaDisponibilidad');

        tabla.innerHTML = '';

        horarios.forEach(horario => {
            const inicio =
                new Date(`2000-01-01 ${horario.hora_inicio}`);

            const fin =
                new Date(`2000-01-01 ${horario.hora_fin}`);

            const horas =
                (fin - inicio) / (1000 * 60 * 60);

            tabla.innerHTML += `
<tr>

    <td>${horario.dia_semana}</td>

    <td>${horario.hora_inicio}</td>

    <td>${horario.hora_fin}</td>

    <td>${horas} h</td>

    <td>

        <span class="badge ${horario.activo == 1
                    ? 'bg-success'
                    : 'bg-danger'
                }">

            ${horario.activo == 1
                    ? 'Activo'
                    : 'Inactivo'
                }

        </span>

    </td>

    <td>

        <button
            class="btn btn-warning btn-sm"
            onclick="editarHorario(${horario.id_disponibilidad})"
        >
            Editar
        </button>

        <button
            class="btn btn-secondary btn-sm"
            onclick="cambiarEstado(
                ${horario.id_disponibilidad},
                ${horario.activo}
            )"
        >
            ${horario.activo == 1
                    ? 'Desactivar'
                    : 'Activar'
                }
        </button>

    </td>

</tr>
`;

        });
        actualizarTarjetas(horarios);

    } catch (error) {

        console.error(error);

    }

}

function actualizarTarjetas(horarios) {

    let activos = 0;

    let horas = 0;

    let duracionTotal = 0;

    horarios.forEach(horario => {

        if (horario.activo == 1) {

            activos++;

            const inicio =
                new Date(`2000-01-01 ${horario.hora_inicio}`);

            const fin =
                new Date(`2000-01-01 ${horario.hora_fin}`);

            horas +=
                (fin - inicio) / (1000 * 60 * 60);

            duracionTotal +=
                horario.duracion_cita;

        }

    });

    document.getElementById('totalHorarios').textContent =
        activos;

    document.getElementById('horasDisponibles').textContent =
        `${horas} h`;

    document.getElementById('duracionPromedio').textContent =
        activos > 0
            ? `${Math.round(duracionTotal / activos)} min`
            : '0 min';

}

async function guardarHorario() {

    try {

        const horario = {

            dia_semana:
                document.getElementById('diaSemana').value,

            hora_inicio:
                document.getElementById('horaInicio').value,

            hora_fin:
                document.getElementById('horaFin').value,

            duracion_cita:
                Number(
                    document.getElementById('duracion').value
                )

        };

        const id =
            document.getElementById('idDisponibilidad').value;

        if (id) {

            await api.put(
                `/disponibilidad/${id}`,
                horario
            );

        } else {

            await api.post(
                '/disponibilidad',
                horario
            );

        }

        modalDisponibilidad.hide();

        document.getElementById(
            'formDisponibilidad'
        ).reset();

        cargarDisponibilidad();

    } catch (error) {

        console.error(error);

        alert(error.mensaje || error.message);

    }

}

async function editarHorario(id) {

    try {

        const horarios = await api.get('/disponibilidad');

        const horario = horarios.find(
            h => h.id_disponibilidad == id
        );

        document.getElementById('tituloModal').textContent =
            'Editar Horario';

        document.getElementById('idDisponibilidad').value =
            horario.id_disponibilidad;

        document.getElementById('diaSemana').value =
            horario.dia_semana;

        document.getElementById('horaInicio').value =
            horario.hora_inicio.substring(0, 5);

        document.getElementById('horaFin').value =
            horario.hora_fin.substring(0, 5);

        document.getElementById('duracion').value =
            horario.duracion_cita || 30;

        modalDisponibilidad.show();

    } catch (error) {

        console.error(error);

    }

}

async function cambiarEstado(id, estadoActual) {

    try {

        const nuevoEstado =
            estadoActual == 1 ? 0 : 1;

        await api.put(
            `/disponibilidad/${id}/estado`,
            {
                estado: nuevoEstado
            }
        );

        cargarDisponibilidad();

    } catch (error) {

        console.error(error);

        alert(error.mensaje || error.message);

    }

}