const formMaterial =
    document.getElementById('formMaterial');

const tablaMateriales =
    document.getElementById('tablaMateriales');


async function cargarMateriales() {

    try {

        const materiales =
            await api.get('/materiales/coordinador');

        tablaMateriales.innerHTML = '';


        if (materiales.length === 0) {

            tablaMateriales.innerHTML = `
                <tr>

                    <td
                        colspan="5"
                        class="text-center text-muted"
                    >
                        No tienes materiales registrados.
                    </td>

                </tr>
            `;

            return;

        }


        materiales.forEach(material => {

            tablaMateriales.innerHTML += `

                <tr>

                    <td>

                        <strong>
                            ${material.titulo}
                        </strong>

                        <br>

                        <small class="text-muted">
                            ${material.nombre_original}
                        </small>

                    </td>


                    <td>

                        ${material.descripcion || 'Sin descripción'}

                    </td>


                    <td>

                        ${obtenerTipoArchivo(
                material.tipo_archivo
            )}

                    </td>


                    <td>

                        ${material.activo == 1

                    ? `
                                <span class="badge bg-success">
                                    Activo
                                </span>
                            `

                    : `
                                <span class="badge bg-secondary">
                                    Inactivo
                                </span>
                            `
                }

                    </td>


                    <td>

                        ${material.activo == 1

                    ? `
                                <button
                                    class="btn btn-danger btn-sm"
                                    onclick="desactivarMaterial(
                                        ${material.id_material}
                                    )"
                                >
                                    Desactivar
                                </button>
                            `

                    : `
                                <button
                                    class="btn btn-success btn-sm"
                                    onclick="activarMaterial(
                                        ${material.id_material}
                                    )"
                                >
                                    Activar
                                </button>
                            `
                }

                    </td>

                </tr>

            `;

        });


    } catch (error) {

        console.error(error);

        tablaMateriales.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    class="text-center text-danger"
                >
                    Error cargando los materiales.
                </td>

            </tr>

        `;

    }

}


function obtenerTipoArchivo(tipo) {

    if (!tipo) {
        return 'Archivo';
    }

    if (tipo.includes('pdf')) {
        return 'PDF';
    }

    if (
        tipo.includes('word') ||
        tipo.includes('document')
    ) {
        return 'Word';
    }

    if (
        tipo.includes('excel') ||
        tipo.includes('spreadsheet')
    ) {
        return 'Excel';
    }

    return 'Archivo';

}


formMaterial.addEventListener(
    'submit',
    async (e) => {

        e.preventDefault();


        const titulo =
            document.getElementById('titulo').value;

        const descripcion =
            document.getElementById('descripcion').value;

        const archivo =
            document.getElementById('archivo').files[0];


        if (!archivo) {

            alert('Debe seleccionar un archivo.');

            return;

        }


        const formulario =
            new FormData();


        formulario.append(
            'titulo',
            titulo
        );

        formulario.append(
            'descripcion',
            descripcion
        );

        formulario.append(
            'archivo',
            archivo
        );


        try {

            const token =
                localStorage.getItem('token');


            const respuesta = await fetch(
                'http://localhost:3000/api/materiales',
                {

                    method: 'POST',

                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    },

                    body: formulario

                }
            );


            const data =
                await respuesta.json();


            if (!respuesta.ok) {

                throw new Error(
                    data.mensaje ||
                    'Error subiendo material.'
                );

            }


            alert(data.mensaje);


            formMaterial.reset();


            await cargarMateriales();


        } catch (error) {

            console.error(error);

            alert(error.message);

        }

    }
);


async function desactivarMaterial(id) {

    if (
        !confirm(
            '¿Desea desactivar este material?'
        )
    ) {

        return;

    }


    try {

        const respuesta = await fetch(
            `http://localhost:3000/api/materiales/${id}/estado`,
            {

                method: 'PUT',

                headers: {

                    'Content-Type':
                        'application/json',

                    Authorization:
                        `Bearer ${localStorage.getItem('token')
                        }`

                },

                body: JSON.stringify({
                    activo: 0
                })

            }
        );


        const data =
            await respuesta.json();


        if (!respuesta.ok) {

            throw new Error(
                data.mensaje ||
                'No se pudo desactivar el material.'
            );

        }


        alert(data.mensaje);

        cargarMateriales();


    } catch (error) {

        console.error(error);

        alert(error.message);

    }

}


async function activarMaterial(id) {

    try {

        const respuesta = await fetch(
            `http://localhost:3000/api/materiales/${id}/estado`,
            {

                method: 'PUT',

                headers: {

                    'Content-Type':
                        'application/json',

                    Authorization:
                        `Bearer ${localStorage.getItem('token')
                        }`

                },

                body: JSON.stringify({
                    activo: 1
                })

            }
        );


        const data =
            await respuesta.json();


        if (!respuesta.ok) {

            throw new Error(
                data.mensaje ||
                'No se pudo activar el material.'
            );

        }


        alert(data.mensaje);

        cargarMateriales();


    } catch (error) {

        console.error(error);

        alert(error.message);

    }

}


cargarMateriales();