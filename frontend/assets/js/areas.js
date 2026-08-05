if (usuario.rol !== 'admin') {
    window.location.href = './login.html';
}

const form =
    document.getElementById('formArea');

async function cargarAreas() {

    try {

        const areas = await api.get('/admin/areas');

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

        alert(error.mensaje || error.message);

    }

}

form.addEventListener('submit', async (e) => {

    e.preventDefault();

    try {

        const data = await api.post(
            '/admin/areas',
            {
                nombre:
                    document.getElementById('nombreArea').value
            }
        );

        alert(data.mensaje);

        form.reset();

        cargarAreas();

    }
    catch (error) {

        console.log(error);

        alert(error.mensaje || error.message);

    }

});

async function cambiarEstado(id, estado) {

    try {

        const data = await api.put(
            `/admin/areas/${id}`,
            {
                estado
            }
        );

        alert(data.mensaje);

        cargarAreas();

    }
    catch (error) {

        console.log(error);

        alert(error.mensaje || error.message);

    }

}

cargarAreas();