async function cargarNotificaciones() {

    try {

        const notificaciones =
            await api.get('/notificaciones');

        const contenedor =
            document.getElementById('contenedorNotificaciones');

        const contador =
            document.getElementById('contadorNotificaciones');


        if (!contenedor) {
            return;
        }


        contenedor.innerHTML = '';


        // Contar notificaciones no leídas

        const noLeidas =
            notificaciones.filter(
                notificacion =>
                    Number(notificacion.leida) === 0
            ).length;


        if (contador) {

            contador.textContent =
                noLeidas;

            contador.style.display =
                noLeidas > 0
                    ? 'inline-block'
                    : 'none';

        }


        // No existen notificaciones

        if (notificaciones.length === 0) {

            contenedor.innerHTML = `
                <div class="alert alert-secondary">
                    No tienes notificaciones.
                </div>
            `;

            return;

        }


        // Mostrar notificaciones

        notificaciones.forEach(notificacion => {

            const leida =
                Number(notificacion.leida) === 1;


            const elemento =
                document.createElement('div');


            elemento.className =
                `card mb-2 ${
                    leida
                        ? ''
                        : 'border-primary'
                }`;


            elemento.innerHTML = `

                <div class="card-body">

                    <div class="d-flex justify-content-between">

                        <h6 class="card-title mb-1">
                            ${notificacion.titulo}
                        </h6>

                        ${
                            !leida
                                ? `
                                    <span class="badge bg-primary">
                                        Nueva
                                    </span>
                                  `
                                : ''
                        }

                    </div>


                    <p class="card-text mb-2">
                        ${notificacion.mensaje}
                    </p>


                    <small class="text-muted">
                        ${formatearFechaNotificacion(
                            notificacion.fecha_envio
                        )}
                    </small>


                    ${
                        !leida
                            ? `
                                <div class="mt-2">

                                    <button
                                        class="btn btn-sm btn-outline-primary"
                                        onclick="marcarNotificacionComoLeida(${notificacion.id_notificacion})"
                                    >
                                        Marcar como leída
                                    </button>

                                </div>
                              `
                            : ''
                    }

                </div>

            `;


            contenedor.appendChild(elemento);

        });

    }
    catch (error) {

        console.error(error);

    }

}


// MARCAR COMO LEÍDA

async function marcarNotificacionComoLeida(
    id_notificacion
) {

    try {

        await api.put(
            `/notificaciones/${id_notificacion}/leida`
        );


        await cargarNotificaciones();

    }
    catch (error) {

        console.error(error);

        alert(
            error.mensaje ||
            error.message
        );

    }

}


// FORMATEAR FECHA

function formatearFechaNotificacion(fecha) {

    const fechaObjeto =
        new Date(fecha);


    return fechaObjeto.toLocaleString(
        'es-CO',
        {
            dateStyle: 'short',
            timeStyle: 'short'
        }
    );

}