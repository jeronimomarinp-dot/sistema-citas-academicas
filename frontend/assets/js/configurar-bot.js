// CONFIGURACIÓN DEL BOT - COORDINADOR

// OBTENER USUARIO AUTENTICADO

const usuarioConfigBot = JSON.parse(
    localStorage.getItem('usuario')
);


// VERIFICAR USUARIO

if (!usuarioConfigBot) {

    window.location.href = './login.html';

}


// VERIFICAR ROL

if (
    usuarioConfigBot &&
    usuarioConfigBot.rol !== 'coordinador'
) {

    window.location.href = './login.html';

}

// ELEMENTOS DEL DOM

const formulario =
    document.getElementById('formPreguntaBot');
const selectArea =
    document.getElementById('area_id');
const inputPregunta =
    document.getElementById('pregunta');
const inputRespuesta =
    document.getElementById('respuesta');
const tablaPreguntas =
    document.getElementById('tablaPreguntasBot');
const mensajePreguntas =
    document.getElementById('mensajePreguntas');
const btnCancelar =
    document.getElementById('btnCancelar');

// VARIABLE PARA SABER SI ESTAMOS EDITANDO

let idPreguntaEditando = null;

// CARGAR ÁREAS

async function cargarAreas() {

    try {

        const areas = await api.get('/areas');


        selectArea.innerHTML = `
            <option value="">
                Seleccione un área
            </option>
        `;


        areas.forEach(area => {

            const option =
                document.createElement('option');

            option.value =
                area.id_area;

            option.textContent =
                area.nombre;

            selectArea.appendChild(option);

        });

    }
    catch (error) {

        console.error(error);

        mensajePreguntas.textContent =
            'No se pudieron cargar las áreas académicas.';

    }

}

// CARGAR PREGUNTAS DEL COORDINADOR

async function cargarPreguntas() {

    try {

        mensajePreguntas.textContent =
            'Cargando preguntas...';


        const preguntas =
            await api.get(
                '/preguntas-bot/coordinador'
            );


        tablaPreguntas.innerHTML = '';


        if (
            !preguntas ||
            preguntas.length === 0
        ) {

            mensajePreguntas.textContent =
                'No tienes preguntas registradas.';

            return;

        }


        mensajePreguntas.textContent =
            `Tienes ${preguntas.length} pregunta(s) registrada(s).`;


        preguntas.forEach(pregunta => {

            const fila =
                document.createElement('tr');


            const estado =
                Number(pregunta.activo) === 1;


            fila.innerHTML = `

                <td>
                    ${escaparHTML(
                pregunta.area || 'Sin área'
            )}
                </td>

                <td>
                    ${escaparHTML(
                pregunta.pregunta
            )}
                </td>

                <td>
                    ${escaparHTML(
                pregunta.respuesta
            )}
                </td>

                <td>

                    ${estado
                    ? `
                                <span class="badge bg-success">
                                    Activa
                                </span>
                              `
                    : `
                                <span class="badge bg-secondary">
                                    Inactiva
                                </span>
                              `
                }

                </td>

                <td>

                    <button
                        type="button"
                        class="btn btn-sm btn-warning me-1"
                        onclick="editarPregunta(${pregunta.id_pregunta})"
                    >

                        <i class="bi bi-pencil"></i>

                        Editar

                    </button>


                    <button
                        type="button"
                        class="btn btn-sm ${estado
                    ? 'btn-danger'
                    : 'btn-success'
                }"
                        onclick="cambiarEstadoPregunta(
                            ${pregunta.id_pregunta},
                            ${estado ? 0 : 1}
                        )"
                    >

                        <i class="bi ${estado
                    ? 'bi-toggle-off'
                    : 'bi-toggle-on'
                }"></i>

                        ${estado
                    ? 'Desactivar'
                    : 'Activar'
                }

                    </button>

                </td>

            `;


            tablaPreguntas.appendChild(fila);

        });

    }
    catch (error) {

        console.error(error);

        mensajePreguntas.textContent =
            error.mensaje ||
            'No se pudieron cargar las preguntas.';

    }

}

// ESCAPAR HTML

function escaparHTML(texto) {

    const div =
        document.createElement('div');

    div.textContent =
        texto ?? '';

    return div.innerHTML;

}

// CREAR / ACTUALIZAR PREGUNTA

formulario.addEventListener(
    'submit',
    async (event) => {

        event.preventDefault();


        const pregunta =
            inputPregunta.value.trim();

        const respuesta =
            inputRespuesta.value.trim();

        const area_id =
            selectArea.value;


        // VALIDACIONES

        if (!area_id) {

            alert(
                'Seleccione un área académica.'
            );

            return;

        }


        if (!pregunta) {

            alert(
                'La pregunta es obligatoria.'
            );

            return;

        }


        if (!respuesta) {

            alert(
                'La respuesta es obligatoria.'
            );

            return;

        }


        try {

            // ACTUALIZAR

            if (idPreguntaEditando) {

                const resultado =
                    await api.put(
                        `/preguntas-bot/${idPreguntaEditando}`,
                        {
                            pregunta,
                            respuesta,
                            area_id
                        }
                    );


                alert(
                    resultado.mensaje ||
                    'Pregunta actualizada correctamente.'
                );

            }

            // CREAR

            else {

                const resultado =
                    await api.post(
                        '/preguntas-bot',
                        {
                            pregunta,
                            respuesta,
                            area_id
                        }
                    );


                alert(
                    resultado.mensaje ||
                    'Pregunta creada correctamente.'
                );

            }


            // LIMPIAR FORMULARIO

            limpiarFormulario();


            // RECARGAR TABLA

            await cargarPreguntas();

        }
        catch (error) {

            console.error(error);

            alert(
                error.mensaje ||
                error.message ||
                'Ocurrió un error al guardar la pregunta.'
            );

        }

    }
);

// EDITAR PREGUNTA

async function editarPregunta(idPregunta) {

    try {

        const preguntas =
            await api.get(
                '/preguntas-bot/coordinador'
            );


        const pregunta =
            preguntas.find(
                item =>
                    Number(item.id_pregunta) ===
                    Number(idPregunta)
            );


        if (!pregunta) {

            alert(
                'No se encontró la pregunta.'
            );

            return;

        }


        // CARGAR DATOS EN EL FORMULARIO

        selectArea.value =
            pregunta.area_id;

        inputPregunta.value =
            pregunta.pregunta;

        inputRespuesta.value =
            pregunta.respuesta;


        // GUARDAR ID DE EDICIÓN

        idPreguntaEditando =
            pregunta.id_pregunta;


        // CAMBIAR BOTONES

        formulario.querySelector(
            'button[type="submit"]'
        ).innerHTML = `

            <i class="bi bi-save"></i>

            Actualizar pregunta

        `;


        btnCancelar.classList.remove(
            'd-none'
        );


        // SUBIR AL FORMULARIO

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    }
    catch (error) {

        console.error(error);

        alert(
            error.mensaje ||
            'No se pudo cargar la pregunta.'
        );

    }

}

// ACTIVAR / DESACTIVAR

async function cambiarEstadoPregunta(
    idPregunta,
    nuevoEstado
) {

    const accion =
        Number(nuevoEstado) === 1
            ? 'activar'
            : 'desactivar';


    const confirmar =
        confirm(
            `¿Está seguro de que desea ${accion} esta pregunta?`
        );


    if (!confirmar) {

        return;

    }


    try {

        const resultado =
            await api.put(
                `/preguntas-bot/${idPregunta}/estado`,
                {
                    activo:
                        Number(nuevoEstado)
                }
            );


        alert(
            resultado.mensaje ||
            'Estado actualizado correctamente.'
        );


        await cargarPreguntas();

    }
    catch (error) {

        console.error(error);

        alert(
            error.mensaje ||
            error.message ||
            'No se pudo actualizar el estado.'
        );

    }

}

// CANCELAR EDICIÓN

btnCancelar.addEventListener(
    'click',
    () => {

        limpiarFormulario();

    }
);

// LIMPIAR FORMULARIO

function limpiarFormulario() {

    formulario.reset();


    idPreguntaEditando =
        null;


    formulario.querySelector(
        'button[type="submit"]'
    ).innerHTML = `

        <i class="bi bi-save"></i>

        Guardar pregunta

    `;


    btnCancelar.classList.add(
        'd-none'
    );

}

// INICIALIZAR

cargarAreas();

cargarPreguntas();