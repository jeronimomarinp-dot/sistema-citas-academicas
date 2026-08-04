const usuario = JSON.parse(
    localStorage.getItem('usuario')
);
window.usuario = usuario;

// SI NO HAY LOGIN

if (!usuario) {

    window.location.href = './login.html';

}

// FUNCIÓN PARA VALIDAR ROL

function validarRol(rolesPermitidos) {

    if (!rolesPermitidos.includes(usuario.rol)) {

        alert('No tienes permisos para entrar aquí');

        // REDIRECCIÓN SEGÚN ROL

        if (usuario.rol === 'admin') {

            window.location.href =
                './dashboard.admin.html';

        }

        if (usuario.rol === 'coordinador') {

            window.location.href =
                './dashboard.coordinador.html';

        }

        if (usuario.rol === 'estudiante') {

            window.location.href =
                './dashboard.estudiante.html';

        }

    }

}