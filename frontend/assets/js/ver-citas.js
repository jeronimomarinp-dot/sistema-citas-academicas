if (usuario.rol !== 'coordinador') {

    window.location.href = './login.html';

}

async function obtenerCitas() {

    try {

        const citas = await api.get(
            `/citas/coordinador/${usuario.id}`
        );

        const tabla =
            document.getElementById('tablaCitas');

        tabla.innerHTML = '';

        citas.forEach(cita => {

            tabla.innerHTML += `

                <tr>

                    <td>${cita.estudiante}</td>

                    <td>${cita.fecha}</td>

                    <td>${cita.hora}</td>

                    <td>${cita.motivo}</td>

                    <td>

                        <span class="
                            badge
                            ${cita.estado === 'aceptada'
                    ? 'bg-success'
                    : cita.estado === 'rechazada'
                        ? 'bg-danger'
                        : 'bg-warning'}
                        ">
                            ${cita.estado}
                        </span>

                    </td>

                    <td>

                        <button
                            class="btn btn-success btn-sm"
                            onclick="actualizarEstado(${cita.id_cita}, 'aceptada')"
                        >
                            Aceptar
                        </button>

                        <button
                            class="btn btn-danger btn-sm"
                            onclick="actualizarEstado(${cita.id_cita}, 'rechazada')"
                        >
                            Rechazar
                        </button>

                    </td>

                </tr>

            `;

        });

    }
    catch (error) {

        console.error(error);

        alert(error.mensaje || error.message);

    }

}

async function actualizarEstado(idCita, estado) {

    try {

        const data = await api.put(
            `/citas/${idCita}`,
            {
                estado
            }
        );

        alert(data.mensaje);

        obtenerCitas();

    }
    catch (error) {

        console.error(error);

        alert(error.mensaje || error.message);

    }

}

obtenerCitas();