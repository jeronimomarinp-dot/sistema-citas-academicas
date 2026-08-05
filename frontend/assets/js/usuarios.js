if (usuario.rol !== 'admin') {

    window.location.href =
        './login.html';

}

async function obtenerUsuarios() {

    try {

        const usuarios = await api.get('/usuarios');

        const tabla =
            document.getElementById('tablaUsuarios');

        tabla.innerHTML = '';

        usuarios.forEach(usuario => {

            tabla.innerHTML += `

               <tr>

    <td>${usuario.id_usuario}</td>

    <td>${usuario.nombre}</td>

    <td>${usuario.correo}</td>

    <td>
        <span class="badge bg-primary">
            ${usuario.rol}
        </span>
    </td>

    <td>
        <span class="badge ${usuario.activo == 1
                    ? 'bg-success'
                    : 'bg-danger'
                }">

            ${usuario.activo == 1
                    ? 'Activo'
                    : 'Inactivo'
                }

        </span>
    </td>

    <td>

        <button
            class="btn btn-warning btn-sm"
            onclick="cambiarRol(${usuario.id_usuario})"
        >
            Rol
        </button>

        <button
            class="btn btn-secondary btn-sm"
            onclick="cambiarEstado(
                ${usuario.id_usuario},
                ${usuario.activo}
            )"
        >
            Estado
        </button>

    </td>

</tr>

            `;

        });

    }
    catch (error) {

        console.error(error);

        alert(error.mensaje || error.message);

    }

}

obtenerUsuarios();

async function cambiarRol(idUsuario) {

    const nuevoRol = prompt(
        'Nuevo rol: estudiante / coordinador / admin'
    );

    if (!nuevoRol) {
        return;
    }

    try {

        const data = await api.put(
            `/usuarios/rol/${idUsuario}`,
            {
                rol: nuevoRol
            }
        );

        alert(data.mensaje);

        obtenerUsuarios();

    }
    catch (error) {

        console.error(error);

        alert(error.mensaje || error.message);

    }

}

async function cambiarEstado(idUsuario, estadoActual) {

    const nuevoEstado =
        estadoActual == 1 ? 0 : 1;

    try {

        const data = await api.put(
            `/usuarios/estado/${idUsuario}`,
            {
                activo: nuevoEstado
            }
        );

        alert(data.mensaje);

        obtenerUsuarios();

    }
    catch (error) {

        console.error(error);

        alert(error.mensaje || error.message);

    }

}