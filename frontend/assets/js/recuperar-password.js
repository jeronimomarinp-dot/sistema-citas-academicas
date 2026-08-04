const form =
    document.getElementById('formRecuperar');

form.addEventListener('submit', async (e) => {

    e.preventDefault();

    const correo =
        document.getElementById('correo').value;

    try {

        const data = await api.post(
            '/recuperar-password',
            {
                correo
            }
        );

        alert(data.mensaje);

    }
    catch (error) {

        console.log(error);

        alert(error.mensaje || error.message);

    }

});