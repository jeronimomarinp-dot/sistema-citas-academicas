if (usuario.rol !== 'admin') {

    window.location.href =
        './login.html';

}

async function obtenerUsuarios() {

    try {

        const response = await fetch(
            'http://localhost:3000/api/usuarios',
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        );


        const usuarios = await response.json();

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

        console.log(error);

        alert('Error cargando usuarios');

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

        const response = await fetch(
            `http://localhost:3000/api/usuarios/rol/${idUsuario}`,
            {
                method: 'PUT',

                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },

                body: JSON.stringify({
                    rol: nuevoRol
                })
            }
        );

        const data = await response.json();

        alert(data.mensaje);

        obtenerUsuarios();

    }
    catch (error) {

        console.log(error);

        alert('Error actualizando rol');

    }

}

async function cambiarEstado(idUsuario, estadoActual) {

    const nuevoEstado =
        estadoActual == 1 ? 0 : 1;

    try {

        const response = await fetch(
            `http://localhost:3000/api/usuarios/estado/${idUsuario}`,
            {
                method: 'PUT',

                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },

                body: JSON.stringify({
                    activo: nuevoEstado
                })
            }
        );

        const data = await response.json();

        alert(data.mensaje);

        obtenerUsuarios();

    }
    catch (error) {

        console.log(error);

        alert('Error actualizando estado');

    }

}