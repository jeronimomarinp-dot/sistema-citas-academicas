if (usuario.rol !== 'admin') {
    window.location.href = './login.html';
}

// logout

const logout = document.getElementById('logout');

logout.addEventListener('click', cerrarSesion);

function cerrarSesion() {

    localStorage.removeItem('usuario');

    localStorage.removeItem('token');

    window.location.href = './login.html';

}

