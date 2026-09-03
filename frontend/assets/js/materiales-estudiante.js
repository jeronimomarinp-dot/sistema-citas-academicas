async function cargarMateriales() {

    try {

        const materiales =
            await api.get('/materiales');

        const tabla =
            document.getElementById('tablaMateriales');

        tabla.innerHTML = '';


        if (materiales.length === 0) {

            tabla.innerHTML = `
                <tr>

                    <td
                        colspan="5"
                        class="text-center text-muted"
                    >
                        No hay materiales disponibles.
                    </td>

                </tr>
            `;

            return;

        }


        materiales.forEach(material => {

            tabla.innerHTML += `

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

                        ${material.coordinador}

                    </td>


                    <td>

                        ${obtenerTipoArchivo(
                material.tipo_archivo
            )}

                    </td>


                    <td>

                        <button
                            class="btn btn-primary btn-sm"
                            onclick="descargarMaterial(
                                ${material.id_material}
                            )"
                        >
                            Descargar
                        </button>

                    </td>

                </tr>

            `;

        });


    } catch (error) {

        console.error(error);

        const tabla =
            document.getElementById('tablaMateriales');

        tabla.innerHTML = `

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


async function descargarMaterial(id) {

    try {

        const token =
            localStorage.getItem('token');

        const respuesta = await fetch(
            `https://sistema-citas-academicas-api.onrender.com/api/materiales/${id}/descargar`,
            {
                method: 'GET',

                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );


        if (!respuesta.ok) {

            const error =
                await respuesta.json();

            throw new Error(
                error.mensaje ||
                'No se pudo descargar el material.'
            );

        }


        const blob =
            await respuesta.blob();


        const url =
            window.URL.createObjectURL(blob);


        const enlace =
            document.createElement('a');

        enlace.href = url;

        enlace.download =
            obtenerNombreArchivo(
                respuesta,
                id
            );

        document.body.appendChild(enlace);

        enlace.click();

        enlace.remove();

        window.URL.revokeObjectURL(url);


    } catch (error) {

        console.error(error);

        alert(error.message);

    }

}


function obtenerNombreArchivo(respuesta, id) {

    const disposition =
        respuesta.headers.get('Content-Disposition');


    if (disposition) {

        let coincidencia =
            disposition.match(
                /filename\*=UTF-8''([^;]+)/i
            );

        if (coincidencia) {

            return decodeURIComponent(
                coincidencia[1]
            );
        }


        coincidencia =
            disposition.match(
                /filename="([^"]+)"/i
            );

        if (coincidencia) {

            return coincidencia[1];

        }

    }


    return `material-${id}`;

}


cargarMateriales();