async function cargarCoordinadores() {

    try {

        const coordinadores = await api.get(
            '/coordinadores'
        );

        const select =
            document.getElementById('coordinador');

        select.innerHTML = `
            <option value="">
                Seleccione un coordinador
            </option>
        `;

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


// ==========================================
// CARGAR HORAS DISPONIBLES
// ==========================================

async function cargarHorasDisponibles() {

    const coordinador =
        document.getElementById('coordinador').value;

    const fecha =
        document.getElementById('fecha').value;

    const selectHora =
        document.getElementById('hora');


    selectHora.innerHTML = `
        <option value="">
            Seleccione una hora
        </option>
    `;


    if (!coordinador || !fecha) {

        return;

    }


    try {

        const disponibilidad =
            await api.get(
                `/disponibilidad/coordinador/${coordinador}`
            );


        const fechaSeleccionada =
            new Date(`${fecha}T00:00:00`);


        const dias = [
            'Domingo',
            'Lunes',
            'Martes',
            'Miércoles',
            'Jueves',
            'Viernes',
            'Sábado'
        ];


        const diaSemana =
            dias[fechaSeleccionada.getDay()];


        const horariosDelDia =
            disponibilidad.filter(
                horario =>
                    horario.dia_semana === diaSemana
            );

        const citasOcupadas =
            await api.get(
                `/citas/ocupadas/${coordinador}?fecha=${fecha}`
            );

        const horasOcupadas =
            citasOcupadas.map(
                cita => cita.hora.substring(0, 5)
            );


        if (horariosDelDia.length === 0) {

            selectHora.innerHTML = `
                <option value="">
                    No hay disponibilidad este día
                </option>
            `;

            return;

        }


        horariosDelDia.forEach(horario => {

            const inicio =
                convertirMinutos(horario.hora_inicio);

            const fin =
                convertirMinutos(horario.hora_fin);

            const duracion =
                horario.duracion_cita || 30;

            for (
                let minutos = inicio;
                minutos < fin;
                minutos += duracion
            ) {

                const hora =
                    convertirHora(minutos);

                if (horasOcupadas.includes(hora)) {

                    continue;

                }

                selectHora.innerHTML += `
            <option value="${hora}">
                ${hora}
            </option>
        `;

            }

        });

    }
    catch (error) {

        console.error(error);

        alert(
            error.mensaje ||
            error.message
        );

    }

}


// ==========================================
// CONVERTIR HORA A MINUTOS
// ==========================================

function convertirMinutos(hora) {

    const partes =
        hora.split(':');

    const horas =
        parseInt(partes[0]);

    const minutos =
        parseInt(partes[1]);

    return (
        horas * 60 +
        minutos
    );

}


// ==========================================
// CONVERTIR MINUTOS A HORA
// ==========================================

function convertirHora(minutos) {

    const horas =
        Math.floor(minutos / 60);

    const minutosRestantes =
        minutos % 60;


    return (
        String(horas).padStart(2, '0') +
        ':' +
        String(minutosRestantes).padStart(2, '0')
    );

}


// ==========================================
// EVENTOS
// ==========================================

document
    .getElementById('coordinador')
    .addEventListener(
        'change',
        cargarHorasDisponibles
    );


document
    .getElementById('fecha')
    .addEventListener(
        'change',
        cargarHorasDisponibles
    );


// ==========================================
// CREAR CITA
// ==========================================

const formCita =
    document.getElementById('formCita');


formCita.addEventListener(
    'submit',
    async (e) => {

        e.preventDefault();


        const cita = {

            id_estudiante:
                usuario.id,

            id_coordinador:
                document
                    .getElementById('coordinador')
                    .value,

            fecha:
                document
                    .getElementById('fecha')
                    .value,

            hora:
                document
                    .getElementById('hora')
                    .value,

            motivo:
                document
                    .getElementById('motivo')
                    .value

        };


        try {

            const data =
                await api.post(
                    '/citas',
                    cita
                );


            alert(data.mensaje);

            formCita.reset();


            document.getElementById(
                'hora'
            ).innerHTML = `
                <option value="">
                    Seleccione una hora
                </option>
            `;

        }
        catch (error) {

            console.error(error);

            alert(
                error.mensaje ||
                error.message
            );

        }

    }
);