const loginForm =
    document.getElementById('loginForm');

loginForm.addEventListener('submit', async (e) => {

    e.preventDefault();

    const correo =
        document.getElementById('correo').value;

    const password =
        document.getElementById('password').value;

    try {

        const data = await api.post('/login', {
            correo,
            password
        });


        if (data.usuario) {

            alert('Login exitoso');

            localStorage.setItem(
                'usuario',
                JSON.stringify(data.usuario)
            );

            localStorage.setItem(
                'token',
                data.token
            );


            if (data.usuario.rol === 'admin') {

                window.location.href =
                    '/pages/dashboard.admin.html';

            }

            if (data.usuario.rol === 'coordinador') {

                window.location.href =
                    '/pages/dashboard.coordinador.html';

            }

            if (data.usuario.rol === 'estudiante') {

                window.location.href =
                    '/pages/dashboard.estudiante.html';

            }

        } else {

            alert(data.mensaje);

        }

    } catch (error) {

        console.log(error);

        alert(error.mensaje || error.message);

    }

});