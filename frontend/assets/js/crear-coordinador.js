if (usuario.rol !== 'admin') {
    window.location.href = './login.html';
}



async function cargarAreas() {

    try {

        const areas = await api.get('/areas');

        const select =
            document.getElementById('area');

        areas.forEach(area => {

            select.innerHTML += `
                <option value="${area.id_area}">
                    ${area.nombre}
                </option>
            `;

        });

    }
    catch (error) {

        console.error(error);

        alert(error.mensaje || error.message);

    }

}

cargarAreas();



const form =
    document.getElementById('formCoordinador');



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

    const coordinador = {

        nombre:
            document.getElementById('nombre').value,

        correo:
            document.getElementById('correo').value,

        password,

        area_id:
            document.getElementById('area').value

    };

    try {
        console.log(coordinador);
        const data = await api.post(
            '/crear-coordinador',
            coordinador
        );

        alert(data.mensaje);

        form.reset();

    }
    catch (error) {

        console.error(error);

        alert(error.mensaje || error.message);

    }

});