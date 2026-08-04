const params = new URLSearchParams(window.location.search);

const token = params.get('token');

const form = document.getElementById('formNuevaPassword');

form.addEventListener('submit', async (e) => {

    e.preventDefault();

    const password =
        document.getElementById('password').value;

    const confirmar =
        document.getElementById('confirmarPassword').value;

    if (password !== confirmar) {

        alert('Las contraseñas no coinciden');

        return;

    }

    try {

        const data = await api.post(
            '/reset-password',
            {
                token,
                password
            }
        );

        alert(data.mensaje);

        window.location.href = './login.html';

    }


    catch (error) {

        console.log(error);

        alert(error.mensaje || error.message);

    }

});