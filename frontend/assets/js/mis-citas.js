if (usuario.rol !== 'estudiante') {
    window.location.href = './login.html';
}

async function obtenerCitas() {

    try {

        const response = await fetch(
            `http://localhost:3000/api/citas/estudiante/${usuario.id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        );

        const citas = await response.json();

        console.log(citas);

        const tabla =
            document.getElementById('tablaCitas');

        tabla.innerHTML = '';

        citas.forEach(cita => {

            let color = 'bg-warning';

            if (cita.estado === 'aceptada') {
                color = 'bg-success';
            }

            if (cita.estado === 'rechazada') {
                color = 'bg-danger';
            }

            tabla.innerHTML += `

                <tr>

                    <td>${cita.coordinador}</td>

                    <td>${cita.fecha}</td>

                    <td>${cita.hora}</td>

                    <td>${cita.motivo}</td>

                    <td>

                        <span class="badge ${color}">
                            ${cita.estado}
                        </span>

                    </td>

                </tr>

            `;

        });

    }
    catch (error) {

        console.log(error);

        alert('Error cargando citas');

    }

}

obtenerCitas();
