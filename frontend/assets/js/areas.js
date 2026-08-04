if (usuario.rol !== 'admin') {
    window.location.href = './login.html';
}

const form =
    document.getElementById('formArea');

async function cargarAreas() {

    try {

        const response = await fetch(
            'http://localhost:3000/api/admin/areas',
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        );

        const areas = await response.json();

        const tabla =
            document.getElementById('tablaAreas');

        tabla.innerHTML = '';

        areas.forEach(area => {

            tabla.innerHTML += `
                <tr>

                    <td>${area.id_area}</td>

                    <td>${area.nombre}</td>

                    <td>
                        ${area.estado == 1
                    ? 'Activa'
                    : 'Inactiva'
                }
                    </td>

                    <td>

                        <button
                            class="btn btn-warning btn-sm"
                            onclick="
                                cambiarEstado(
                                    ${area.id_area},
                                    ${area.estado == 1 ? 0 : 1}
                                )
                            "
                        >
                            ${area.estado == 1
                    ? 'Desactivar'
                    : 'Activar'
                }
                        </button>

                    </td>

                </tr>
            `;

        });

    }
    catch (error) {

        console.log(error);

        alert('Error cargando áreas');

    }

}

form.addEventListener('submit', async (e) => {

    e.preventDefault();

    try {

        const response = await fetch(
            'http://localhost:3000/api/admin/areas',
            {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },

                body: JSON.stringify({
                    nombre:
                        document.getElementById('nombreArea').value
                })
            }
        );

        const data = await response.json();

        alert(data.mensaje);

        form.reset();

        cargarAreas();

    }
    catch (error) {

        console.log(error);

        alert('Error creando área');

    }

});

async function cambiarEstado(id, estado) {

    try {

        const response = await fetch(
            `http://localhost:3000/api/admin/areas/${id}`,
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

        cargarAreas();

    }
    catch (error) {

        console.log(error);

        alert('Error actualizando área');

    }

}

cargarAreas();