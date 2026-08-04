async function cargarCoordinadores() {

    try {

        const response = await fetch(
            'http://localhost:3000/api/coordinadores',
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        );

        const coordinadores = await response.json();

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

        console.log(error);

        alert('Error cargando coordinadores');

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

        const response = await fetch(
            'http://localhost:3000/api/citas',
            {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },

                body: JSON.stringify(cita)
            }
        );

        const data = await response.json();

        alert(data.mensaje);

        formCita.reset();

    } catch (error) {

        console.log(error);

        alert('Error al crear cita');

    }

});