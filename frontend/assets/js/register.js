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

        console.log(error);

        alert('Error cargando áreas');

    }

}

cargarAreas();

const form =
    document.getElementById('formRegister');

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

    const usuario = {

        nombre:
            document.getElementById('nombre').value,

        correo:
            document.getElementById('correo').value,

        password,

        area_id:
            document.getElementById('area').value

    };

    try {

        const data = await api.post('/register', usuario);

        alert(data.mensaje);

        window.location.href =
            './login.html';



    }
    catch (error) {

        console.log(error);

        alert(error.message);

    }
});