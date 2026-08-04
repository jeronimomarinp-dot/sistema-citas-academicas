if (usuario.rol !== 'coordinador') {

    window.location.href = './login.html';

}

async function obtenerCitas() {

    try {

        const response = await fetch(
            `http://localhost:3000/api/citas/coordinador/${usuario.id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        );

        const citas = await response.json();

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

        console.log(error);

        alert('Error obteniendo citas');

    }

}

async function actualizarEstado(idCita, estado) {

    try {

        const response = await fetch(
            `http://localhost:3000/api/citas/${idCita}`,
            {
                method: 'PUT',

                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },

                body: JSON.stringify({
                    estado
                })
            }
        );

        const data = await response.json();

        alert(data.mensaje);

        obtenerCitas();

    }
    catch (error) {

        console.log(error);

        alert('Error actualizando estado');

    }

}

obtenerCitas();