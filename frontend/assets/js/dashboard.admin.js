if (usuario.rol !== 'admin') {
    window.location.href = './login.html';
}

// logout

const logout = document.getElementById('logout');

logout.addEventListener('click', () => {

    localStorage.removeItem('usuario');

    window.location.href = './login.html';

});

