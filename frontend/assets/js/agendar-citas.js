async function cargarCoordinadores() {

    try {

        const coordinadores = await api.get(
            '/coordinadores'
        );

        const select =
            document.getElementById('coordinador');

        coordinadores.forEach(coordinador => {

            select.innerHTML += `
                <option value="${coordinador.id_usuario}">
                    ${coordinador.nombre} - ${coordinador.area}
                </option>
            `;

        });

    }
    catch (error) {

        console.error(error);

        alert(error.mensaje || error.message);

    }

}

cargarCoordinadores();

const formCita = document.getElementById('formCita');

formCita.addEventListener('submit', async (e) => {

    e.preventDefault();

    const cita = {

        id_estudiante: usuario.id,

        id_coordinador:
            document.getElementById('coordinador').value,

        fecha:
            document.getElementById('fecha').value,

        hora:
            document.getElementById('hora').value,

        motivo:
            document.getElementById('motivo').value

    };

    try {

        const data = await api.post(
            '/citas',
            cita
        );

        alert(data.mensaje);

        formCita.reset();

    } catch (error) {

        console.error(error);

        alert(error.mensaje || error.message);

    }

});